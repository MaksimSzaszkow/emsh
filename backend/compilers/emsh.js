/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

class EmshBaseChecks {
  isAssigment(string) {
    const long = / equals /;
    const short = /={1}/;
    return long.test(string) || short.test(string);
  }

  isConditional(string) {
    return /^if/.test(string);
  }

  isSimpleForLoop(string) {
    const long = /^do .* times$/;
    const medium = /^.* times$/;
    const short = /^.* t$/;
    return long.test(string) || medium.test(string) || short.test(string);
  }

  isNormalForLoop(string) {
    const long = /^for .* while .* change .*/;
    const medium = /^for *( *.* *; *.* *; *.* *)/;
    const short = /^for .* .* .*/;
    return long.test(string) || medium.test(string) || short.test(string);
  }

  isWhileLoop(string) {
    const long = /while .* do/;
    const medium = /while *(.*)/;
    const short = /while .*/;
    return long.test(string) || medium.test(string) || short.test(string);
  }

  isFunction(string) {
    const long = /^function .* for .* does$/;
    const medium = /^func .* *( *.* *)$/;
    const short = /^f .* *( *.* *)$/;
    return long.test(string) || medium.test(string) || short.test(string);
  }

  isDisplay(string) {
    const medium = /^display(.*)$/;
    const short = /^display .*/;
    return medium.test(string) || short.test(string);
  }

  isReturn(string) {
    return /return .*/.test(string);
  }

  isClass(string) {
    return /^class .*/.test(string);
  }

  isModule(string) {
    return /^module .*/.test(string);
  }
}

class EmshVariable {
  type = "variable";
  name;
}

class EmshFunction {
  type = "function";
  name;
  params;
  body = [];

  constructor(name, params = []) {
    this.name = name;
    this.params = params;
  }
}

class EmshForLoop {
  type = "forLoop";
  varName;
  condition;
  step;
  body = [];

  constructor(varName, condition, step) {
    this.varName = varName;
    this.condition = condition;
    this.step = step;
  }
}

class EmshWhileLoop {
  type = "whileLoop";
  condition;
  body = [];
}

class EmshClass {
  type = "class";
  name;
  variables = {};
  functions = {};

  constructor(name) {
    this.name = name;
  }
}

class EmshStruct {
  type = "struct";
  name;
  fields;
}

class EmshModule {
  type = "module";
  name;
  classes = {};
  functions = {};
  variables = {};

  constructor(name) {
    this.name = name;
  }
}

class EmshLine {
  code;
}

class EmshDisplay {
  type = "display";
  message;

  constructor(message) {
    this.message = message;
  }
}

class Emsh {
  EmshCode;
  EmshChecker;
  EmshCodeObject = { main: new EmshModule("main") };
  currentDepth = 0;
  context = {
    type: "module",
    path: ["main"],
  };

  constructor(EmshCode = "", EmshChecker = new EmshBaseChecks()) {
    this.EmshCode = EmshCode;
    this.EmshChecker = EmshChecker;
    this.createEmshCodeObject(this.EmshCode.split("\n"));
  }

  createEmshCodeObject(code) {
    code.forEach((line) => {
      const [newDepth, trimmedLine] = this.howManyTabsAtStart(line);

      if (newDepth > this.currentDepth) this.currentDepth = newDepth;
      else if (newDepth < this.currentDepth) this.currentDepth = newDepth;

      if (this.EmshChecker.isModule(trimmedLine)) {
        const [, name] = trimmedLine.split("module ");
        this.EmshCodeObject[name] = new EmshModule(name);
        this.context = { type: "module", path: [name] };
      } else if (this.EmshChecker.isClass(trimmedLine)) {
        const [, name] = trimmedLine.split("class ");
        if (this.currentDepth > 0) {
          this.EmshCodeObject[this.context.path[0]].classes[
            name
          ] = new EmshClass(name);
          this.context = {
            type: "class",
            path: [...this.context.path, "classes", name],
          };
        } else {
          this.EmshCodeObject.main.classes[name] = new EmshClass(name);
          this.context = { type: "class", path: ["main", "classes", name] };
        }
      } else if (this.EmshChecker.isFunction(trimmedLine)) {
        const [n, p] = trimmedLine.split("for");
        const name = n.split("func ")[1].trim();
        const params = p.split(",").map((param) => param.trim());
        const c = this.getContextObject();

        c.functions[name] = new EmshFunction(name, params);

        this.context = {
          type: "function",
          path: [...this.context.path, "functions", name],
        };
      } else if (this.EmshChecker.isNormalForLoop(trimmedLine)) {
        //TODO IMPLEMENT
      } else if (this.EmshChecker.isSimpleForLoop(trimmedLine)) {
        const c = this.getContextObject();

        c.body = [
          ...c.body,
          new EmshForLoop("i", `i<${trimmedLine.split(" ")[1]}`, "i++"),
        ];

        this.context = {
          type: "forLoop",
          path: [...this.context.path, "body", c.body.length - 1],
        };
      } else if (this.EmshChecker.isWhileLoop(trimmedLine)) {
      } else if (this.EmshChecker.isConditional(trimmedLine)) {
      } else if (this.EmshChecker.isReturn(trimmedLine)) {
      } else if (this.EmshChecker.isDisplay(trimmedLine)) {
        const c = this.getContextObject();

        c.body = [
          ...c.body,
          new EmshDisplay(trimmedLine.split(" ").splice(1).join(" ")),
        ];
      }
    });
  }

  howManyTabsAtStart(string) {
    let amount = 0;
    while (string.startsWith("\t")) {
      amount++;
      string = string.substring(1);
    }
    return [amount, string];
  }

  generateTabs(depth) {
    let tabs = "";
    while (depth > 0) {
      tabs += "\t";
      depth--;
    }
    return tabs;
  }

  getContextObject(obj = this.EmshCodeObject, index = 0) {
    if (index === this.context.path.length - 1)
      return obj[this.context.path[index]];
    return this.getContextObject(obj[this.context.path[index]], index + 1);
  }
}

module.exports = Emsh;
