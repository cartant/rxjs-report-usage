"use strict";

const { parse } = require("@babel/parser");
const { readFileSync } = require("fs");
const glob = require("glob");
const { resolve } = require("path");
const collectUsageWithinFile = require("./collect-usage-within-file");

module.exports = async function collectUsage(cwd) {
  const [sourceFiles, packageFiles] = await Promise.all(
    [
      "**/*.{js,jsx,ts,tsx}",
      "node_modules/**/@(rxjs|typescript)/package.json",
    ].map(
      (pattern) =>
        new Promise((resolve, reject) =>
          glob(
            pattern,
            {
              cwd,
              ignore: ["**/node_modules/**/*.{js,jsx,ts,tsx}"],
            },
            (error, files) => {
              if (error) {
                reject(error);
              } else {
                resolve(files);
              }
            }
          )
        )
    )
  );

  const usage = {
    apis: {},
    packageVersions: {},
    schemaVersion: 1,
    timestamp: Date.now(),
  };

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
