import { concat, of } from "rxjs";
import { concatMap } from "rxjs/operators";

const answers = concat(of(42), of(54)).pipe(
  concatMap((value) => value.toString())
);
