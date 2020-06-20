"use strict";

const { merge, of } = require("rxjs");
const { mergeMap } = require("rxjs/operators");

const answers = merge(of(42), of(54)).pipe(
  mergeMap((value) => value.toString())
);
