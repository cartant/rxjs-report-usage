"use strict";

const collectUsage = require("../src/collect-usage");

test("namespace requires", () => {
  return collectUsage("./fixtures/namespace-requires").then((usage) => {
    delete usage.timestamp;
    expect(usage).toStrictEqual({
      apis: {
        rxjs: { concat: 1, merge: 1, of: 4 },
        "rxjs/operators": { concatMap: 1, mergeMap: 1 },
      },
      packageVersions: { rxjs: ["6.5.5"], typescript: ["3.9.5"] },
      schemaVersion: 1,
    });
  });
});
