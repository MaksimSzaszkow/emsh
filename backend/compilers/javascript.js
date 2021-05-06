/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const Emsh = require("./emsh");
const { js_beautify } = require("js-beautify");
const pythonFormat = require("python-format");

class Javascript extends Emsh {
  constructor(pseudocode) {
    super();
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
      if (this.isFunction(trimmedLine)) {
        const [func, paramsPart] = trimmedLine.split("for");
        const params = paramsPart.slice(0, -4);
        validCode = `${validCode}${func}(${params})`;
      } else if (this.isForLoop(trimmedLine)) {
        validCode = `${validCode}for(let i = 0; i < ${trimmedLine.slice(
          3,
          -6
        )}; i++)`;
      } else if (this.isWhileLoop(trimmedLine)) {
        validCode = `${validCode}while(${trimmedLine.slice(6, -3)})`;
      } else if (this.isConditional(trimmedLine)) {
        const condition = trimmedLine.split(" ").splice(1).join(" ");
        validCode = `${validCode}if(${condition})`;
      } else if (this.isAssigment(trimmedLine)) {
        const [variable, value] = trimmedLine.split("=");
        const index = this.variables.indexOf((v) => v.name === variable);
        if (index !== -1) {
          this.variables[index].value = value;
          this.variables[index].changes = true;
          validCode = `${validCode}${variable}=${value};\n`;
        } else {
          this.variables.push({
            name: variable,
            value,
            changes: false,
          });
          validCode = `${validCode}let ${variable}=${value};\n`;
        }
      } else if (this.isPrint(trimmedLine)) {
        const log = trimmedLine.split(" ").splice(1).join(" ");
        validCode = `${validCode}console.log(${log});\n`;
      } else if (trimmedLine === "") {
        validCode = `${validCode}\n`;
      } else {
        validCode = `${validCode}${trimmedLine};\n`;
      }
    });

    while (this.currentDepth > 0) {
      validCode = `${validCode}}`;
      this.currentDepth--;
    }
    this.code = js_beautify(`${validCode}`);
  }
}

module.exports = Javascript;
