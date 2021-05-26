/* eslint-disable @typescript-eslint/explicit-function-return-type */
class CoreChecks {
  static validName = "[a-zA-Z_][a-zA-Z_0-9]*";

  static check(string, human, long, short) {
    if (human.test(string)) return "human";
    else if (long.test(string)) return "long";
    else if (short.test(string)) return "short";
    return "";
  }

  static isImport(string) {
    const human = new RegExp(`from .+ import ${this.validName}`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  static isExport(string) {
    const human = new RegExp(`export ${this.validName}`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  static isModule(string) {
    const human = new RegExp(`module ${this.validName}:`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  static isClass(string) {
    const human = new RegExp(`class ${this.validName}:`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  static isFunction(string) {
    const human = new RegExp(
      `function (${this.validName}){0,1} for ((${this.validName} {0,1},{1} {0,1})*)${this.validName} does:`
    );
    const long = new RegExp(
      `function ([a-zA-Z_][a-zA-Z_0-9]*){0,1} *\\( *(([a-zA-Z_][a-zA-Z_0-9]*, *)*)[a-zA-Z_][a-zA-Z_0-9]* *\\):`
    );
    const short = new RegExp(
      `f (${this.validName}){0,1} *\\( *((${this.validName}, *)*)${this.validName} *\\):`
    );
    return this.check(string, human, long, short);
  }

  static isSimpleForLoop(string) {
    const human = new RegExp(`do ${this.validName} times:`);
    const long = new RegExp(`${this.validName} times:`);
    const short = new RegExp(`${this.validName} times:`);

    return this.check(string, human, long, short);
  }

  static isNormalForLoop(string) {
    const human = new RegExp(
      `for ${this.validName} {0,1}, {0,1}.* {0,1}, {0,1}.*:`
    );
    const long = new RegExp(
      `for \\( {0,1}${this.validName} {0,1}[,;] {0,1}.* {0,1}[,;] {0,1}.* {0,1}\\):`
    );
    const short = new RegExp(
      `for \\( {0,1}${this.validName} {0,1}[,;] {0,1}.* {0,1}[,;] {0,1}.* {0,1}\\):`
    );

    return this.check(string, human, long, short);
  }

  static isForInLoop(string) {
    const human = new RegExp(
      `for ${this.validName}( {0,1}, {0,1}${this.validName}){0,1} in .* {0,1}:`
    );
    const long = new RegExp(
      `for \\( {0,1}${this.validName}( {0,1}, {0,1}${this.validName}){0,1} in .* {0,1}\\):`
    );
    const short = new RegExp(
      `for \\( {0,1}${this.validName}( {0,1}, {0,1}${this.validName}){0,1} in .* {0,1}\\):`
    );

    return this.check(string, human, long, short);
  }

  static isForOfLoop(string) {
    const human = new RegExp(
      `for ${this.validName}( {0,1}, {0,1}${this.validName}){0,1} of .* {0,1}:`
    );
    const long = new RegExp(
      `for \\( {0,1}${this.validName}( {0,1}, {0,1}${this.validName}){0,1} of .* {0,1}\\):`
    );
    const short = new RegExp(
      `for \\( {0,1}${this.validName}( {0,1}, {0,1}${this.validName}){0,1} of .* {0,1}\\):`
    );

    return this.check(string, human, long, short);
  }

  static isWhileLoop(string) {
    const human = new RegExp(`while .* {0,1}:`);
    const long = new RegExp(`while ( {0,1}.* {0,1}) {0,1}:`);
    const short = new RegExp(`while ( {0,1}.* {0,1}) {0,1}:`);

    return this.check(string, human, long, short);
  }

  static isDoWhileLoop(string) {
    const human = new RegExp(`do:`);
    const long = human;
    const short = human;

    return this.check(string, human, long, short);
  }

  static isIfStatement(string) {
    const human = new RegExp(`if [^()]*:`);
    const long = new RegExp(`if *\\( *.* *\\):`);
    const short = new RegExp(`if *\\( *.* *\\):`);

    return this.check(string, human, long, short);
  }

  static isElseStatement(string) {
    const human = new RegExp(`else *:`);
    const long = human;
    const short = human;
    return this.check(string, human, long, short);
  }

  static isElseIfStatement(string) {
    const human = new RegExp(`else if [^()]*:`);
    const long = new RegExp(`else if *\\( *.* *\\):`);
    const short = new RegExp(`elif *\\( *.* *\\):`);

    return this.check(string, human, long, short);
  }

  static isDisplay(string) {
    const human = new RegExp(`display .*`);
    const long = new RegExp(`display *( *.* *)`);
    const short = new RegExp(`display *( *.* *)`);

    return this.check(string, human, long, short);
  }

  static isReturn(string) {
    const human = new RegExp(`return .*`);
    const long = new RegExp(`return .*`);
    const short = new RegExp(`return .*`);

    return this.check(string, human, long, short);
  }
}

module.exports = CoreChecks;
