node数据校验工具

例子：
let Validate = require('node-validate');
let options = [
  { key: 'num', required: false, type: 'number', },
  { key: 'str1', required: true, type: 'string', }];
let param = { str1: '123' }
let test = new Validate(options, param)
let res = test.execute();

console.log(res)

测试：
npm run test;