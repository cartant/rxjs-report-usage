"use strict";

const bent = require("bent");
const prompts = require("prompts");
const collectUsage = require("./collect-usage");

module.exports = async function (cwd) {
  console.log(`Collecting usage within '${cwd}' ...`);
  const usage = collectUsage(cwd);
  console.log(JSON.stringify(usage, null, 2));
};
