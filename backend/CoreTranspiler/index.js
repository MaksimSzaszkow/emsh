/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const CoreAnalizer = require("./CoreAnalizer");

module.exports = class CoreTranspiler {
  code;
  position;
  currentDepth;

  constructor(code) {
    this.code = code;
    this.position = 0;
    this.currentDepth = 0;
  }

  Transpile() {
    for (const line of this.code.split("\n")) {
      if (line.trim().length) {
        const t = CoreAnalizer.Analize(line);
        console.log(t);
      }
    }
  }

  Module(code) {}

  Class(code) {}

  Function(code) {}
};
