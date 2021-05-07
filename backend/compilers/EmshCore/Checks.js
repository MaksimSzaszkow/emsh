/* eslint-disable @typescript-eslint/explicit-function-return-type */
class CoreChecks {
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

module.exports = CoreChecks;
