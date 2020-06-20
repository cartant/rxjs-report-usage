"use strict";

const collectUsage = require("../src/collect-usage");

test("named imports", () => {
  return collectUsage("./fixtures/named-imports").then((usage) => {
    expect(usage).toStrictEqual({
      apis: {
        rxjs: { concat: 1, merge: 1, of: 4 },
        "rxjs/operators": { concatMap: 1, mergeMap: 1 },
      },
      versions: { rxjs: ["6.5.5"], typescript: ["3.9.5"] },
    });
  });
});
