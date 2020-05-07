## js数据校验工具

### 例子

``` javascript
let Validate = require('validate4js'); 
//or import Validate from "validate4js";
//typescript import Validate = require('../../../../tt');
let options = [
  {key: 'num',required: false,type: 'number'},
  {key: 'str1',required: true,type: 'string'},
  {key: 'boolean1',required: false,type: 'boolean'},
  {key: 'enum1',required: true,type: 'enum',enumOption: ['1', 'eee', 'a', 123]},
  {key: 'arr1',required: false,type: 'Array'},
  {key: 'obj1',required: false,type: 'object',options: [
    {key: 'a',required: true,type: 'string'},
    {key: 'b',required: true,type: 'number'}],
  },
  {key: 'date1',required: true,type: 'date'},
  {key: 'fun',required: false,type: 'function',
        validate: function(val) {
            if (val > 10) return false;
            else return true
        }
    }
];
let param = {
    str1: '123',
    enum1: '1',
    obj1: {
        a: '11',
        b: 123
    },
    date1: '2020-01-01 12:12:12'
}
let validate = new Validate(options, param)
let resolve = validate.execute();
console.log(resolve) 
//{
//  err: 0,
//  data: {
//    num: undefined,
//    str1: '123',
//    boolean1: undefined,
//    enum1: '1',
//    arr1: undefined,
//    obj1: { a: '11', b: 123 },
//    date1: '2020-01-01 12:12:12',
//    fun: undefined
//  }
//}
```

### options属性

|属性|值|说明|
|----|----|----|
|key|string|校验属性名|
|required|boolean|是否必需存在|
|type|string|数据类型 目前支持【function，boolean，enum，Array，date，object，number，string】|
|enumOption|Array|type为enum时添加|
|options|options[]|type为object时可添加，进行递归校验|
|validate|function|type为function时添加，进行自定义校验|

### 返回值

|属性|值|说明|
|----|----|----|
|err|number|0为通过校验 -1为校验失败|
|data|object|传入的param进行options过滤|
|msg|string|err为-1时 返回的错误说明|

### 测试

npm run test; 
