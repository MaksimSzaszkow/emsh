/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

class Emsh {
  currentDepth = 0;
  variables = [];
  functions = [];
  code = "";

  isFunction(string) {
    const long = /^function .* for .* does$/;
    const medium = /^func .* *( *.* *)$/;
    const short = /^f .* *( *.* *)$/;
    return long.test(string) || medium.test(string) || short.test(string);
  }

  isConditional(string) {
    return /^if/.test(string);
  }

  isAssigment(string) {
    const long = / equals /;
    const short = /={1}/;
    return long.test(string) || short.test(string);
  }

  isPrint(string) {
    const medium = /^log(.*)$/;
    const short = /^log .*/;
    return medium.test(string) || short.test(string);
  }

  isSimpleForLoop(string) {
    const long = /^do [0-9]* times$/;
    const medium = /^[0-9]* times$/;
    const short = /^[0-9]* t$/;
    return long.test(string) || medium.test(string) || short.test(string);
  }

  isForLoop(string) {
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

  isReturn(string) {
    return /return .*/.test(string);
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

module.exports = Emsh;
