module.exports.File = class {
  type = "file";
  name;
  imports = [];
  contains = [];
  exports = [];

  constructor(name) {
    this.name = name;
  }
};

module.exports.Module = class {
  type = "module";
  name;
  public = {
    variables: [],
    functions: [],
    classes: [],
  };
  private = {
    variables: [],
    functions: [],
    classes: [],
  };
  static = {
    variables: [],
    functions: [],
    classes: [],
  };

  constructor(name) {
    this.name = name;
  }
};

module.exports.Class = class {
  type = "class";
  name;
  public = {
    variables: [],
    functions: [],
    classes: [],
  };
  private = {
    variables: [],
    functions: [],
    classes: [],
  };
  protected = {
    variables: [],
    functions: [],
    classes: [],
  };
  static = {
    variables: [],
    functions: [],
    classes: [],
  };

  constructor(name) {
    this.name = name;
  }
};

module.exports.Function = class {
  type = "function";
  name;
  params;
  body = [];

  constructor(name, params) {
    this.name = name;
    this.params = params;
  }
};
