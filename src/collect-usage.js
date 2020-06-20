"use strict";

const { parse } = require("@babel/parser");
const { readFileSync } = require("fs");
const glob = require("glob");
const { resolve } = require("path");
const collectUsageWithinFile = require("./collect-usage-within-file");

module.exports = function collectUsage(cwd) {
  const usage = {
    apis: {},
    packageVersions: {},
    schemaVersion: 1,
    timestamp: Date.now(),
  };

  const sourceFiles = glob.sync("**/*.{js,jsx,ts,tsx}", {
    cwd,
    ignore: ["**/node_modules/**/*.*"],
  });
  sourceFiles.forEach((file) => {
    if (/\.d\.ts$/.test(file)) {
      return;
    }
    const code = readFileSync(resolve(cwd, file), "utf8");
    try {
      const ast = parse(code, {
        plugins: ["classProperties", "typescript"],
        sourceType: "unambiguous",
      });
      collectUsageWithinFile(ast, usage);
    } catch (error) {
      console.error(
        `Skipping '${file}' due to parsing error:\n  ${error.message}`
      );
    }
  });

  const packageFiles = glob.sync(
    "**/node_modules/**/@(rxjs|typescript)/package.json",
    { cwd }
  );
  packageFiles.forEach((file) => {
    const content = JSON.parse(readFileSync(resolve(cwd, file), "utf8"));
    let versions = usage.packageVersions[content.name];
    if (!versions) {
      versions = usage.packageVersions[content.name] = [];
    }
    versions.push(content.version);
  });

  return usage;
};
