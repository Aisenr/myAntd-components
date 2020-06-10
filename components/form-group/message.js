export function newMessages() {
  return {
    default: 'Validation error on field %s',
    required: '不能为空',
    enum: '%s must be one of %s',
    whitespace: '%s 不能有空格',
    date: {
      format: '格式不正确',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '日期无效',
    },
    types: {
      string: '不是字符串',
      method: '不是一个方法',
      array: '不是一个数组',
      object: '不是一个对象',
      number: '不是一个数字',
      date: '不是一个日期',
      boolean: '应填“true”或“false”',
      integer: '应为整数类型',
      float: '应为小数类型',
      regexp: '%s is not a valid %s',
      email: '应为email',
      url: '应为URL',
      hex: '%s is not a valid %s',
    },
    string: {
      len: '长度应为',
      min: '长度最小',
      max: '长度最大',
      range: '长度应在',
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s',
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length',
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s',
    },
    clone() {
      const cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    },
  };
}

export const messages = newMessages();
