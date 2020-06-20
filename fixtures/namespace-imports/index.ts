import * as foo from "foo";
import * as rx from "rxjs";
import * as op from "rxjs/operators";

const answers = rx
  .merge(rx.of(42), rx.of(54))
  .pipe(op.mergeMap((value) => value.toString()));
foo.bar(answers);

