/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const CoreChecks = require("./EmshCore/Checks");

const CoreTypes = require("./EmshCore/Types");

class Emsh {
  EmshCode;
  EmshChecker;
  EmshCodeObject = { main: new CoreTypes.EmshModule("main") };
  currentDepth = 0;
  context = {
    type: "module",
    path: ["main"],
  };

  constructor(EmshCode = "", EmshChecker = new CoreChecks()) {
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
        this.EmshCodeObject[name] = new CoreTypes.EmshModule(name);
        this.context = { type: "module", path: [name] };
      } else if (this.EmshChecker.isClass(trimmedLine)) {
        const [, name] = trimmedLine.split("class ");
        if (this.currentDepth > 0) {
          this.EmshCodeObject[this.context.path[0]].classes[
            name
          ] = new CoreTypes.EmshClass(name);
          this.context = {
            type: "class",
            path: [...this.context.path, "classes", name],
          };
        } else {
          this.EmshCodeObject.main.classes[name] = new CoreTypes.EmshClass(
            name
          );
          this.context = { type: "class", path: ["main", "classes", name] };
        }
      } else if (this.EmshChecker.isFunction(trimmedLine)) {
        const [n, p] = trimmedLine.split("for");
        const name = n.split("func ")[1].trim();
        const params = p.split(",").map((param) => param.trim());
        const c = this.getContextObject();

        c.functions[name] = new CoreTypes.EmshFunction(name, params);

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
          new CoreTypes.EmshForLoop(
            "i",
            `i<${trimmedLine.split(" ")[1]}`,
            "i++"
          ),
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
          new CoreTypes.EmshDisplay(trimmedLine.split(" ").splice(1).join(" ")),
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
