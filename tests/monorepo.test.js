"use strict";

const collectUsage = require("../src/collect-usage");

test("monorepo", () => {
  const usage = collectUsage("./fixtures/monorepo");
  delete usage.timestamp;
  expect(usage).toStrictEqual({
    apis: {
      rxjs: { concat: 2, merge: 2, of: 8 },
      "rxjs/operators": { concatMap: 2, mergeMap: 2 },
    },
    packageVersions: { rxjs: ["6.5.5", "6.5.4"], typescript: ["3.9.5", "3.9.4"] },
    schemaVersion: 1,
  });
});
