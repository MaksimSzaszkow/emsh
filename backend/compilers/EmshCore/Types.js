module.exports.EshmFunction = class {
  type = "function";
  name;
  params;
  body = [];

  constructor(name, params = []) {
    this.name = name;
    this.params = params;
  }
};

module.exports.EmshForLoop = class {
  type = "forLoop";
  varName;
  condition;
  step;
  body = [];

  constructor(varName, condition, step) {
    this.varName = varName;
    this.condition = condition;
    this.step = step;
  }
};

module.exports.EmshWhileLoop = class {
  type = "whileLoop";
  condition;
  body = [];
};

module.exports.EmshClass = class {
  type = "class";
  name;
  variables = {};
  functions = {};

  constructor(name) {
    this.name = name;
  }
};

module.exports.EmshStruct = class {
  type = "struct";
  name;
  fields;
};

module.exports.EmshModule = class {
  type = "module";
  name;
  classes = {};
  functions = {};
  variables = {};

  constructor(name) {
    this.name = name;
  }
};

module.exports.EmshLine = class {
  code;
};

module.exports.EmshDisplay = class {
  type = "display";
  message;

  constructor(message) {
    this.message = message;
  }
};

module.exports.EmshVariable = class {
  type = "variable";
  name;
};
