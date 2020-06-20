"use strict";

const rx = require("rxjs");
const op = require("rxjs/operators");

const answers = rx
  .concat(rx.of(42), rx.of(54))
  .pipe(op.concatMap((value) => value.toString()));
