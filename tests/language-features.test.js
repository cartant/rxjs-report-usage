"use strict";

const collectUsage = require("../src/collect-usage");

test("language features", () => {
  const usage = collectUsage("./fixtures/language-features");
  delete usage.timestamp;
  expect(usage).toStrictEqual({
    apis: {},
    packageVersions: {},
    schemaVersion: 1,
  });
});
