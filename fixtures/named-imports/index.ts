import { merge, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

const answers = merge(of(42), of(54)).pipe(
  mergeMap((value) => value.toString())
);
