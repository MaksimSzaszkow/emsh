module.exports.File = class {
  type = "file";
  name;
  imports;
  contains;
  exports;

  constructor(name, imports, contains, exports) {
    this.name = name;
    this.imports = imports;
    this.contains = contains;
    this.exports = exports;
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

  constructor(name, publicPart, privatePart, staticPart) {
    this.name = name;
    this.public = publicPart;
    this.private = privatePart;
    this.static = staticPart;
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

  constructor(name, publicPart, privatePart, protectedPart, staticPart) {
    this.name = name;
    this.public = publicPart;
    this.private = privatePart;
    this.protected = protectedPart;
    this.static = staticPart;
  }
};

module.exports.Function = class {
  type = "function";
  name;
  params = [];
  body = [];
};
