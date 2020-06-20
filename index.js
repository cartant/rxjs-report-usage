"use strict";

const glob = require("glob");

console.log(`find usage within '${process.cwd()}' and report it`);

Promise.all(
  [
    "**/*.{js,jsx,ts,tsx}",
    "node_modules/**/@(rxjs|typescript)/package.json",
  ].map(
    (pattern) =>
      new Promise((resolve, reject) =>
        glob(pattern, { ignore: ["node_modules/**/*.{js,jsx,ts,tsx}"] }, (error, files) => {
          if (error) {
            reject(error);
          } else {
            resolve(files);
          }
        })
      )
  )
).then(([sourceFiles, packageFiles]) => {
  // Information to collect:
  //
  // - rxjs version(s) used
  // - typescript version used
  // - API export usage counts
  //
  // Use Babel/Babylon and its bindings to obtain the counts.
  console.log(sourceFiles, packageFiles);
});
