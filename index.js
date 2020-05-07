module.exports = Validator;
function Validator(options, param) {
  this.recursion = true;
  this.index = 0;
  this.length = 0;
  this.data = {};
  this.options = options || [];
  this.param = param;
  this.length = options.length;
}

Validator.prototype.execute = function () {
  if (this.options.length === 0) return {}
  return this.check();
}

Validator.prototype.check = function () {
  const option = this.options[this.index];
  const paramItem = this.param[option.key];
  if (option.required && paramItem == undefined && paramItem == null) {
    this.recursion = false;
    return { msg: `缺少${option.key}参数`, err: -1 };
  }
  switch (option.type) {
    case 'function':
      let Function = this.checkFunction(option, paramItem);
      if (Function) return Function;
      break;
    case 'boolean':
      let boolean = this.checkBoolean(option, paramItem);
      if (boolean) return boolean;
      break;
    case 'enum':
      let Enum = this.checkEnum(option, paramItem);
      if (Enum) return Enum;
      break;
    case 'Array':
      let array = this.checkArray(option, paramItem);
      if (array) return array;
      break;
    case 'date':
      let date = this.checkDate(option, paramItem);
      if (date) return date;
      break;
    case 'object':
      let object = this.checkObject(option, paramItem);
      if (object) return object;
      break;
    case 'number':
      let number = this.checkNumber(option, paramItem);
      if (number) return number;
      break;
    default:
      let resolve = this.checkDefault(option, paramItem);
      if (resolve) return resolve;
      break;
  }

  ++this.index;
  let r;
  if (this.length > this.index && this.recursion) {
    r = this.check();
  }
  if (r && r.err !== 0) {
    return r;
  } else {
    return { err: 0, data: this.data };
  }
}

Validator.prototype.checkNumber = function (option, paramItem) {
  if (paramItem) {
    if (typeof paramItem == 'string') {
      if (isNaN(parseFloat(paramItem))) {
        this.recursion = false;
        return { msg: `${option.key}参数类型为${option.type}`, err: -1 };
      }
      paramItem = parseFloat(paramItem);
    } else if (typeof paramItem !== option.type) {
      this.recursion = false;
      return { msg: `${option.key}参数类型为${option.type}`, err: -1 };
    }
  }
  this.data[option.key] = paramItem;
}

Validator.prototype.checkDefault = function (option, paramItem) {
  if (paramItem) {
    if (typeof paramItem !== option.type) {
      this.recursion = false;
      return { msg: `${option.key}参数类型为${option.type}`, err: -1 };
    }
  }
  this.data[option.key] = paramItem;
}

Validator.prototype.checkBoolean = function (option, paramItem) {
  if (paramItem) {
    if (typeof paramItem !== 'boolean') {
      return { msg: `${option.key}参数类型校验不正确`, err: -1 };
    }
  }
  this.data[option.key] = paramItem;
}

Validator.prototype.checkEnum = function (option, paramItem) {
  if (paramItem) {
    if (!option.enumOption || !Array.isArray(option.enumOption)) {
      this.recursion = false;
      return { msg: `请配置${option.key}的enumOption`, err: -1 };
    }
    else if (!option.enumOption.includes(paramItem)) {
      this.recursion = false;
      return { msg: `${option.key}参数不在enum范围内`, err: -1 };
    }
  }
  this.data[option.key] = paramItem;
}

Validator.prototype.checkDate = function (option, paramItem) {
  if (paramItem) {
    if (isNaN(Date.parse(paramItem))) {
      this.recursion = false;
      return { msg: `${option.key}参数类型为${option.type}`, err: -1 };
    }
  }
  this.data[option.key] = paramItem;
}

Validator.prototype.checkArray = function (option, paramItem) {
  if (paramItem) {
    if (!Array.isArray(paramItem)) {
      this.recursion = false;
      return { msg: `${option.key}参数类型为${option.type}`, err: -1 };
    }
  }
  this.data[option.key] = paramItem;
}

Validator.prototype.checkObject = function (option, paramItem) {
  if (paramItem) {
    if (typeof paramItem !== option.type) {
      this.recursion = false;
      return { msg: `${option.key}参数类型为${option.type}`, err: -1 };
    }
    if (Array.isArray(option.options) && option.options.length > 0) {
      const validate = new Validator(option.options, paramItem);
      const r = validate.execute();
      if (r.err !== 0) {
        this.recursion = false;
        return r;
      }
    }
  }
  this.data[option.key] = paramItem;
}

Validator.prototype.checkFunction = function (option, paramItem) {
  const result = option.validate(paramItem);
  if (!result) {
    this.recursion = false;
    return { msg: `${option.key}参数类型校验不正确`, err: -1 };
  }
  this.data[option.key] = paramItem;
}