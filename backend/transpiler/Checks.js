/* eslint-disable @typescript-eslint/explicit-function-return-type */
class CoreChecks {
  validName = "[a-zA-Z_][a-zA-Z_0-9]*";

  check(string, human, long, short) {
    if (human.test(string)) return "human";
    else if (long.test(string)) return "long";
    else if (short.test(string)) return "short";
    return "";
  }

  isImport(string) {
    const human = new RegExp(`from .+ import ${this.validName}`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  isModule(string) {
    const human = new RegExp(`module ${this.validName}:`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  isClass(string) {
    const human = new RegExp(`class ${this.validName}:`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  isFunction(string) {
    const human = new RegExp(
      `function (${this.validName}){0,1} for ((${this.validName} {0,1},{1} {0,1})*)${this.validName} does:`
    );
    const long = new RegExp(
      `function (${this.validName}){0,1} {0,1}\( {0,1}((${this.validName} {0,1},{1} {0,1})*)${this.validName} {0,1}\):`
    );
    const short = new RegExp(
      `f (${this.validName}){0,1} {0,1}\( {0,1}((${this.validName} {0,1},{1} {0,1})*)${this.validName} {0,1}\):`
    );

    return this.check(string, human, long, short);
  }

  isSimpleForLoop(string) {
    const human = new RegExp(`do ${this.validName} times:`);
    const long = new RegExp(`${this.validName} times:`);
    const short = new RegExp(`${this.validName} times:`);

    return this.check(string, human, long, short);
  }

  isNormalForLoop(string) {
    const human = new RegExp(
      `for ${this.validName} {0,1}, {0,1}.* {0,1}, {0,1}.*:`
    );
    const long = new RegExp(
      `for \( {0,1}${this.validName} {0,1}[,;] {0,1}.* {0,1}[,;] {0,1}.* {0,1}\):`
    );
    const short = new RegExp(
      `for \( {0,1}${this.validName} {0,1}[,;] {0,1}.* {0,1}[,;] {0,1}.* {0,1}\):`
    );

    return this.check(string, human, long, short);
  }

  isForInLoop(string) {
    const human = new RegExp(`for ${this.validName} in .* {0,1}:`);
    const long = new RegExp(`for \( {0,1}${this.validName} in .* {0,1}\):`);
    const short = new RegExp(`for \( {0,1}${this.validName} in .* {0,1}\):`);

    return this.check(string, human, long, short);
  }

  isForOfLoop(string) {
    const human = new RegExp(`for ${this.validName} of .* {0,1}:`);
    const long = new RegExp(`for \( {0,1}${this.validName} of .* {0,1}\):`);
    const short = new RegExp(`for \( {0,1}${this.validName} of .* {0,1}\):`);

    return this.check(string, human, long, short);
  }

  isWhileLoop(string) {
    const human = new RegExp(`while .* {0,1}:`);
    const long = new RegExp(`while ( {0,1}.* {0,1}) {0,1}:`);
    const short = new RegExp(`while ( {0,1}.* {0,1}) {0,1}:`);

    return this.check(string, human, long, short);
  }

  isDoWhileLoop(string) {
    const human = new RegExp(`do:`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  isAssigment(string) {
    const long = / equals /;
    const short = /={1}/;
    return long.test(string) || short.test(string);
  }

  isConditional(string) {
    const long = /if *(.*)/;
    const short = /if ./;

    if (long.test(string)) return { passed: true, type: "long" };
    else if (short.test(string)) return { passed: true, type: "short" };
    return { passed: false };
  }

  isDisplay(string) {
    const medium = /^display(.*)$/;
    const short = /^display .*/;
    return medium.test(string) || short.test(string);
  }

  isReturn(string) {
    return /return .*/.test(string);
  }
}

module.exports = CoreChecks;
