interface options {
  key: string;
  required: boolean;
  type: string;
  validate?: Function;
  options?: options[];
  enumOption?: any[]
}

interface resolve {
  err: number,
  data?: object,
  msg: string
}

declare class Validate {
  constructor(options: options[], param: object)
  execute(): resolve
}

export = Validate;