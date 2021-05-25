/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const CoreChecks = require("./Checks");

const CoreTypes = require("./Types");

class CoreTranspiler {}

class CoreAnalizer {
  static checks = [
    { function: "isImport", type: "import" },
    { function: "isExport", type: "export" },
    { function: "isModule", type: "module" },
    { function: "isClass", type: "class" },
    { function: "isFunction", type: "function" },
    { function: "isSimpleForLoop", type: "simpleForLoop" },
    { function: "isNormalForLoop", type: "normalForLoop" },
    { function: "isForInLoop", type: "forInLoop" },
    { function: "isForOfLoop", type: "forOfLoop" },
    { function: "isWhileLoop", type: "whileLoop" },
    { function: "isDoWhileLoop", type: "doWhileLoop" },
    { function: "isIfStatements", type: "ifStatement" },
    { function: "isElseStatements", type: "elseStatement" },
    { function: "isElseIfStatements", type: "elseIfStatement" },
    { function: "isDisplay", type: "display" },
    { function: "isReturn", type: "return" },
  ];

  static CoreAnalizer(line) {}

  static import() {}

  static export() {}

  static module() {}

  static function() {}

  static simpleForLoop() {}

  static normalForLoop() {}

  static forInLoop() {}

  static forOfLoop() {}

  static whileLoop() {}

  static doWhileLoop() {}

  static ifStatement() {}

  static elseStatement() {}

  static elseIfStatement() {}

  static display() {}

  static return() {}

  static getType(line) {
    for (const check of CoreAnalizer.checks) {
      const version = CoreChecks[check.function](line);
      if (version) return { type: check.type, version };
    }
  }
}

module.exports = CoreTranspiler;
