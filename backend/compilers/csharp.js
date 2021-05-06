/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const Emsh = require("./emsh");

class CSharp extends Emsh {
  constructor(pseudocode) {
    super();
    const code = pseudocode.split("\n").map((line) => `\t\t\t${line}`);
    let validCode =
      "namespace Default{\n\tclass D{\n\t\tstatic void Main(string[] args){\n\t\t\t";
    this.currentDepth = 3;

    code.forEach((line) => {
      const [newDepth, trimmedLine] = this.howManyTabsAtStart(line);

      if (newDepth > this.currentDepth) {
        validCode = `${validCode}{\n`;
        this.currentDepth = newDepth;
      } else if (newDepth < this.currentDepth) {
        validCode = `${validCode}${this.generateTabs(newDepth)}}\n`;
        this.currentDepth = newDepth;
      }
      validCode += this.generateTabs(this.currentDepth);
      if (this.isFunction(trimmedLine)) {
        const [func, paramsPart] = trimmedLine.split("for");
        const params = paramsPart.slice(0, -4);
        validCode = `${validCode}${func}(${params})`;
      } else if (this.isSimpleForLoop(trimmedLine)) {
        validCode += `for(int i = 0; i < ${trimmedLine.slice(3, -6)}; i++)`;
      } else if (this.isForLoop(trimmedLine)) {
        validCode = `${validCode}for(int i = 0; i < ${trimmedLine.slice(
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
          validCode = `${validCode}var ${variable}=${value};\n`;
        }
      } else if (this.isPrint(trimmedLine)) {
        const log = trimmedLine.split(" ").splice(1).join(" ");
        validCode = `${validCode}System.WriteLine(${log});\n`;
      } else if (trimmedLine === "") {
        validCode = `${validCode}\n`;
      } else {
        validCode = `${validCode}${trimmedLine};\n`;
      }
    });

    while (this.currentDepth > 0) {
      validCode = `${validCode}${this.generateTabs(this.currentDepth - 1)}}\n`;
      this.currentDepth--;
    }
    this.code = validCode;
  }
}

module.exports = CSharp;
