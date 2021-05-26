/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const CoreAnalizer = require("./CoreAnalizer");
const CoreTypes = require("./CoreTypes");

module.exports = class CoreTranspiler {
  code;
  position;
  currentDepth;
  context;
  ECO;

  constructor(code) {
    this.code = code.split("\n").filter((line) => line.trim().length > 0);
    this.position = 0;
    this.currentDepth = 0;
    this.ECO = new CoreTypes.File("default");
    this.context = [this.ECO];
  }

  Transpile() {
    if (this.code.length === this.position) return;
    const depth = this.getDepth(this.code[this.position]);
    while (depth < this.currentDepth) {
      this.context.pop();
      this.currentDepth--;
    }
    if (depth > this.currentDepth + 2) {
      throw new Error(`Erorr: Too much indentation at ${this.position + 1}`);
    }
    const line = this.code[this.position].trim();

    if (line.length) {
      const EcoObject = CoreAnalizer.Analize(line);
      switch (EcoObject.type) {
        case "module":
          this.Module(EcoObject);
          break;
        case "class":
          this.Class(EcoObject);
          break;
        case "function":
          this.Function(EcoObject);
          break;
      }
      this.currentDepth++;
    }
    this.position++;
    this.Transpile();
  }

  Module(EcoModule) {
    const contextObj = this.context[this.context.length - 1];
    if (contextObj.type === "file") {
      const m = this.ECO.contains.find(
        (module) => module.name === EcoModule.name
      );

      if (!m) {
        this.ECO.contains.push(EcoModule);
        this.context.push(EcoModule);
      } else {
        throw new Error(
          `Error at ${this.position + 1}: Module with name ${
            EcoModule.name
          } already exists`
        );
      }
    } else {
      throw new Error(
        `Error at ${
          this.position + 1
        }: Module can only be defined at file level, while this line tries to define it at ${
          contextObj.type
        } level`
      );
    }
  }

  Class(EcoClass) {
    const contextObj = this.context[this.context.length - 1];

    if (contextObj.type === "file") {
      let main = this.ECO.contains.find((module) => module.name === "main");
      if (!main) {
        main = new CoreTypes.Module("main");
        this.ECO.contains.push(main);
      }
      main.public.classes.push(EcoClass);
      this.context.push(main);
    } else if (contextObj.type === "module") {
      contextObj.public.classes.push(EcoClass);
      this.context.push(EcoClass);
    } else {
      throw new Error(
        `Error at ${
          this.position + 1
        }: Class can only be defined at file or module level, while this line tries to define it at ${
          contextObj.type
        } level`
      );
    }
  }

  Function(EcoFunction) {
    const contextObj = this.context[this.context.length - 1];
    if (contextObj.type === "file") {
      let main = this.ECO.contains.find((module) => module.name === "main");
      if (!main) {
        main = new CoreTypes.Module("main");
        this.ECO.contains.push(main);
      }
      main.public.functions.push(EcoFunction);
      this.context.push(EcoFunction);
    } else if (contextObj.type === "module" || contextObj.type === "class") {
      contextObj.public.functions.push(EcoFunction);
      this.context.push(EcoFunction);
    } else {
      throw new Error(
        `Error at ${
          this.position + 1
        }: Function can only be defined at file, module or class level, while this line tries to define it at ${
          contextObj.type
        } level`
      );
    }
  }

  getDepth(line) {
    let depth = 0;
    while (line.startsWith("\t")) {
      depth++;
      line = line.replace("\t", "");
    }
    return depth;
  }
};
