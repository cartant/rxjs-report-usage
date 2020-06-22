# `ndjson-filter`

* Records that have a `concat` creator:

    ```
    node to-ndjson.js rxjs-report-usage.csv | yarn ndjson-filter "d.apis.rxjs.concat > 0"
    ```

* Records that have a `concatMap` operator:

    ```
    node to-ndjson.js rxjs-report-usage.csv | yarn ndjson-filter "d.apis['rxjs/operators'].concatMap > 0"
    ```

# `ndjson-map`

* `concatMap` operator counts:

    ```
    node to-ndjson.js rxjs-report-usage.csv | yarn ndjson-map "d.apis['rxjs/operators'].concatMap"
    ```

# `ndjson-reduce`

* Total `concatMap` operator counts:

    ```
    node to-ndjson.js rxjs-report-usage.csv | yarn ndjson-reduce "p + d.apis['rxjs/operators'].concatMap" "0"
    ```