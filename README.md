# rxjs-report-usage

The script within this package collects anonymous API usage statistics and reports them to the RxJS core team.

When run inside a project, the script locates all JavaScript and TypeScript files - except for those in the `node_modules` directory - and parses them with Babel. The parsed code is searched for `import` statements and `require` calls that consume `rxjs` and a usage count is recorded for each consumed RxJS API.

The script also locates any `rxjs` and `typescript` packages within `node_modules` and reports their versions. The versions of other packages are **not included** in the report.

The anonymous statistics that are collected look like this:

```json
{
  "apis": {
    "rxjs": {
      "concat": 1,
      "merge": 1,
      "of": 4
    },
    "rxjs/operators": {
      "concatMap": 1,
      "mergeMap": 1
    },
  },
  "packageVersions": {
    "rxjs": ["6.5.5"],
    "typescript": ["3.9.5"]
  },
  "schemaVersion": 1,
  "timestamp": 1592659729551
}
```

Once the script has collected the usage statistics, the payload is shown and the developer is prompted to confirm the sending of the payload to the core team. The script sends no information without the developer's consent.

For more information - including the most convenient ways of running the script - see this blog post: [Reporting API Usage](http://ncjamieson.com/reporting-api-usage/).
