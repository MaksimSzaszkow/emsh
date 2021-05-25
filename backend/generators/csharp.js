/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const Emsh = require("../CoreTranspiler");

class CSharp extends Emsh {
  code = "";

  constructor(pseudocode) {
    super(pseudocode);
    for (const key in this.EmshCodeObject) {
      this.buildCode(this.EmshCodeObject[key], 0);
    }
  }

  buildCode(EmshObject, depth) {
    switch (EmshObject.type) {
      case "module": {
        this.code += `namespace ${EmshObject.name}{\n`;
        for (const key in EmshObject.classes) {
          this.buildCode(EmshObject.classes[key], depth + 1);
        }
        this.code += `${this.generateTabs(depth)}}\n`;
        break;
      }
      case "class": {
        this.code += `${this.generateTabs(depth)}class ${EmshObject.name}{\n`;
        for (const key in EmshObject.functions) {
          this.buildCode(EmshObject.functions[key], depth + 1);
        }
        this.code += `${this.generateTabs(depth)}}\n`;
        break;
      }
      case "function": {
        this.code += `${this.generateTabs(depth)}void ${
          EmshObject.name
        }(${EmshObject.params.join(",")}){\n`;
        EmshObject.body.forEach((EmshObject) =>
          this.buildCode(EmshObject, depth + 1)
        );
        this.code += `${this.generateTabs(depth)}}\n`;
        break;
      }
      case "forLoop": {
        this.code += `${this.generateTabs(depth)}for(int ${
          EmshObject.varName
        } = 0; ${EmshObject.condition}; ${EmshObject.step}){\n`;
        EmshObject.body.forEach((EmshObject) =>
          this.buildCode(EmshObject, depth + 1)
        );
        this.code += `${this.generateTabs(depth)}}\n`;
        break;
      }
      case "display": {
        this.code += `${this.generateTabs(depth)}System.WriteLine(${
          EmshObject.message
        });\n`;
      }
    }
  }
}

module.exports = CSharp;
