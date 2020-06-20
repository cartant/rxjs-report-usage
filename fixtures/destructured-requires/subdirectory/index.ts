"use strict";

const { concat, of } = require("rxjs");
const { concatMap } = require("rxjs/operators");

const answers = concat(of(42), of(54)).pipe(
  concatMap((value) => value.toString())
);
