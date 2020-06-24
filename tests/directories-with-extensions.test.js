"use strict";

const collectUsage = require("../src/collect-usage");

test("directories with extensions", () => {
  const usage = collectUsage("./fixtures/directories-with-extensions");
  delete usage.timestamp;
  expect(usage).toStrictEqual({
    apis: {
      rxjs: { Observable: 0 },
    },
    packageVersions: {},
    schemaVersion: 1,
  });
});
