"use strict";

const csv = require("csv-parser");
const fs = require("fs");
const yargs = require("yargs");

yargs.command(
  "$0 <file>",
  "convert a CSV file to ndjson",
  (yargs) =>
    yargs.positional("file", {
      describe: "the CSV file to convert",
    }),
  (argv) => convert(argv.file)
).argv;

function convert(file) {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => console.log(data.usage));
}
