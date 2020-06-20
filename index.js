"use strict";

const { parse } = require("@babel/parser");
const { readFileSync } = require("fs");
const glob = require("glob");
const prompts = require("prompts");

const cwd = process.cwd();
process.chdir("../rxjs-etc");
console.log(`find usage within '${process.cwd()}' and report it`);

Promise.all(
  [
    "**/*.{js,jsx,ts,tsx}",
    "node_modules/**/@(rxjs|typescript)/package.json",
  ].map(
    (pattern) =>
      new Promise((resolve, reject) =>
        glob(
          pattern,
          { ignore: ["node_modules/**/*.{js,jsx,ts,tsx}"] },
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
)
  .then(([sourceFiles, packageFiles]) => {
    // Information to collect and report:
    //
    // - usage schema version
    // - rxjs version(s) used
    // - typescript version used
    // - API export usage counts
    //
    // Use Babel/Babylon and its bindings to obtain the counts.
    console.log(sourceFiles, packageFiles);
    sourceFiles.forEach((file) => {
      if (/\.d\.ts$/.test(file)) {
        return;
      }
      const code = readFileSync(file, "utf8");
      try {
        parse(code, {
          plugins: ["classProperties", "typescript"],
          sourceType: "unambiguous",
        });
      } catch (error) {
        console.error(`Skipping '${file}' due to parsing error:\n  ${error.message}`);
      }
    });
    packageFiles.forEach((file) => {
      const content = JSON.parse(readFileSync(file, "utf8"));
      console.log(content.name, content.version);
    });
  })
  .finally(() => process.chdir(cwd));
