/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { js_beautify } = require("js-beautify");
const pythonFormat = require("python-format");

class Checker {
  currentDepth = 0;
  variables = [];
  functions = [];
  code = "";

  constructor(pseudocode) {
    const code = pseudocode.split("\n");
    let validCode = "";
    code.forEach((line) => {
      const [newDepth, trimmedLine] = this.howManyTabsAtStart(line);

      if (newDepth > this.currentDepth) {
        validCode = `${validCode}{`;
        this.currentDepth = newDepth;
      } else if (newDepth < this.currentDepth) {
        validCode = `${validCode}}`;
        this.currentDepth = newDepth;
      }

      if (this.isConditional(trimmedLine)) {
        const condition = trimmedLine.split(" ").splice(1).join(" ");
        validCode = `${validCode}if(${condition})`;
      } else if (this.isAssigment(trimmedLine)) {
        const [variable, value] = trimmedLine.split("=");
        const index = this.variables.indexOf((v) => v.name === variable);
        if (index !== -1) {
          this.variables[index].value = value;
          this.variables[index].changes = true;
          validCode = `${validCode}${variable}=${value};`;
        } else {
          this.variables.push({
            name: variable,
            value,
            changes: false,
          });
          validCode = `${validCode}let ${variable}=${value};`;
        }
      } else if (this.isPrint(trimmedLine)) {
        const log = trimmedLine.split(" ").splice(1).join(" ");
        validCode = `${validCode}console.log(${log});`;
      } else {
        validCode = `${validCode}${trimmedLine};`;
      }
    });

    while (this.currentDepth > 0) {
      validCode = `${validCode}}`;
      this.currentDepth--;
    }
    this.code = js_beautify(`${validCode}`);
  }

  isConditional(string) {
    return /if .*/.test(string);
  }

  isAssigment(string) {
    return /={1}/.test(string);
  }

  isPrint(string) {
    return /log .*/.test(string);
  }

  howManyTabsAtStart(string) {
    let amount = 0;
    while (string.startsWith("\t")) {
      amount++;
      string = string.substring(1);
    }
    return [amount, string];
  }
}

module.exports = Checker;
