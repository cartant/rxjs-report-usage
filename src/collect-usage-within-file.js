"use strict";

const traverse = require("@babel/traverse").default;
const types = require("@babel/types");

module.exports = function collectUsageWithinFile(ast, usage) {
  const t = types;
  const visitor = {
    ImportDeclaration(path) {
      const { specifiers, source } = path.node;
      const { bindings } = path.scope;
      specifiers.forEach((specifier) => {
        if (!t.isImportSpecifier(specifier)) {
          return;
        }
        const { value } = source;
        if (!/^rxjs(\/|$)/.test(value)) {
          return;
        }
        const { imported, local } = specifier;
        bindings;
        let location = usage.apis[value];
        if (!location) {
          location = usage.apis[value] = {};
        }
        const count = location[imported.name] || 0;
        location[imported.name] =
          count + bindings[local.name].referencePaths.length;
      });
    },
  };
  traverse(ast, visitor, undefined, {});
};
