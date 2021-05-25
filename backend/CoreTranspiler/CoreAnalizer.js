/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const CoreChecks = require("./CoreChecks");
const CoreTypes = require("./CoreTypes");

module.exports = class CoreAnalizer {
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

  static Analize(line) {
    const { type, version } = this.getType(line);

    return this[type](line, version);
  }

  static import(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static export(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static module(line, version) {
    switch (version) {
      case "human": {
        const name = line.replace(/module /, "").replace(":", "");
        return new CoreTypes.Module(name);
      }
      case "long": {
        const name = line.replace(/module /, "").replace(":", "");
        return new CoreTypes.Module(name);
      }
      case "short": {
        const name = line.replace(/module /, "").replace(":", "");
        return new CoreTypes.Module(name);
      }
    }
  }

  static class(line, version) {
    switch (version) {
      case "human": {
        const name = line.replace(/class /, "").replace(":", "");
        return new CoreTypes.Class(name);
      }
      case "long": {
        const name = line.replace(/class /, "").replace(":", "");
        return new CoreTypes.Class(name);
      }
      case "short": {
        const name = line.replace(/class /, "").replace(":", "");
        return new CoreTypes.Class(name);
      }
    }
  }

  static function(line, version) {
    switch (version) {
      case "human": {
        const name = line.replace(/function /, "").split(" for ")[0];
        const params = line
          .replace(/function .* for /, "")
          .replace(/does:/, "")
          .split(",");
        return new CoreTypes.Function(name, params);
      }
      case "long": {
        const name = line.replace(/function /, "").split(/ *\(/)[0];
        const params = line
          .replace(/function .* *\( */, "")
          .replace(/\):/, "")
          .split(",");
        return new CoreTypes.Function(name, params);
      }
      case "short": {
        const name = line.replace(/f /, "").split(/ *\(/)[0];
        const params = line
          .replace(/f .* *\( */, "")
          .replace(/\):/, "")
          .split(",");
        return new CoreTypes.Function(name, params);
      }
    }
  }

  static simpleForLoop(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static normalForLoop(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static forInLoop(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static forOfLoop(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static whileLoop(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static doWhileLoop(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static ifStatement(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static elseStatement(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static elseIfStatement(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static display(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static return(line, version) {
    switch (version) {
      case "human": {
        return "";
      }
      case "long": {
        return "";
      }
      case "short": {
        return "";
      }
    }
  }

  static getType(line) {
    for (const check of CoreAnalizer.checks) {
      const version = CoreChecks[check.function](line);
      if (version) return { type: check.type, version };
    }
  }
};
