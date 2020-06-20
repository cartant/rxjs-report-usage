"use strict";

const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const { readFileSync } = require("fs");
const glob = require("glob");
const prompts = require("prompts");

const cwd = process.cwd();
process.chdir("../rxjs-etc");
console.log(`Collecting usage within '${process.cwd()}' ...`);

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
    const usage = {
      apis: {
        /*
         * "rxjs": {
         *   "concat": 1
         * },
         * "rxjs/fetch": {
         *   "fromFetch": 1
         * },
         * "rxjs/operators": {
         *   "concatMap": 1
         * },
         */
      },
      versions: {
        /*
         * "rxjs": ["6.5.5"],
         * "typescript": ["3.9.3"],
         */
      },
    };
    sourceFiles.forEach((file) => {
      if (/\.d\.ts$/.test(file)) {
        return;
      }
      const code = readFileSync(file, "utf8");
      try {
        const ast = parse(code, {
          plugins: ["classProperties", "typescript"],
          sourceType: "unambiguous",
        });
        collectUsage(ast, usage);
      } catch (error) {
        console.error(
          `Skipping '${file}' due to parsing error:\n  ${error.message}`
        );
      }
    });
    packageFiles.forEach((file) => {
      const content = JSON.parse(readFileSync(file, "utf8"));
      let versions = usage.versions[content.name];
      if (!versions) {
        versions = usage.versions[content.name] = [];
      }
      versions.push(content.version);
    });
    console.log(JSON.stringify(usage, null, 2));
  })
  .finally(() => process.chdir(cwd));

function collectUsage(ast, usage) {
  const t = types;
  const visitor = {
    ImportDeclaration(path) {
      const { specifiers, source } = path.node;
      const { bindings } = path.scope;
      specifiers.forEach((specifier) => {
        if (!t.isImportSpecifier(specifier)) {
          return;
        }
        const { value } = source;
        if (!/^rxjs(\/|$)/.test(value)) {
          return;
        }
        const { imported, local } = specifier;
        bindings;
        let location = usage.apis[value];
        if (!location) {
          location = usage.apis[value] = {};
        }
        const count = location[imported.name] || 0;
        location[imported.name] =
          count + bindings[local.name].referencePaths.length;
      });
    },
  };
  traverse(ast, visitor, undefined, {});
}
