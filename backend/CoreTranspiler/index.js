/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

module.exports = class CoreTranspiler {
  code;
  position;
  currentDepth = 0;

  ECO = {};

  Code(code) {}

  Module(code) {}

  Class(code) {}

  Function(code) {}
};
