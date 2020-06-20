import * as rx from "rxjs";
import * as op from "rxjs/operators";

const answers = rx.concat(rx.of(42), rx.of(54)).pipe(
  op.concatMap((value) => value.toString())
);
