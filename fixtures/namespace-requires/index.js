"use strict";

const rx = require("rxjs");
const op = require("rxjs/operators");

const answers = rx
  .merge(rx.of(42), rx.of(54))
  .pipe(op.mergeMap((value) => value.toString()));
