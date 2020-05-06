var { describe, it } = require("mocha");
var assert = require('assert');
var Validate = require('../index');

describe('required测试', function () {
  it('required正确测试', function () {
    let options = [
      { key: 'num', required: false, type: 'number', },
      { key: 'str1', required: true, type: 'string', }];
    let param = { str1: '123' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });

  it('required错误测试', function () {
    let options = [
      { key: 'num', required: false, type: 'number', },
      { key: 'str1', required: true, type: 'string', }];
    let param = { str1: 123 }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
});

describe('String测试', function () {
  it('String错误类型err返回', function () {
    let options = [
      { key: 'str', required: false, type: 'string', },
      { key: 'str1', required: true, type: 'string', }];
    let param = { str: 123, str1: '123' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
  it('String正确类型err返回', function () {
    let options = [
      { key: 'str', required: false, type: 'string', },
      { key: 'str1', required: true, type: 'string', }];
    let param = { str: '123', str1: '123' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
});

describe('Number测试', function () {
  it('Number正确类型err返回', function () {
    let options = [
      { key: 'num', required: false, type: 'number', },
      { key: 'num1', required: true, type: 'number', }];
    let param = { num: '123', num1: '123' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
  it('Number错误类型err返回', function () {
    let options = [
      { key: 'num', required: false, type: 'number', },
      { key: 'num1', required: true, type: 'number', }];
    let param = { num: 'asdsds', num1: '123' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
});


describe('Boolean测试', function () {
  it('Boolean正确类型err返回', function () {
    let options = [
      { key: 'test', required: false, type: 'boolean', },
      { key: 'test1', required: true, type: 'boolean', }];
    let param = { test: false, test1: true }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
  it('Boolean错误类型err返回', function () {
    let options = [
      { key: 'test', required: false, type: 'boolean', },
      { key: 'test1', required: true, type: 'boolean', }];
    let param = { test1: '123' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
});


describe('Enum测试', function () {
  let options = [
    { key: 'test', required: false, type: 'enum', enumOption: [1, 2, 3, 4] },
    { key: 'test1', required: true, type: 'enum', enumOption: ['1', 'eee', 'a'] }];
  it('Enum错误类型err返回', function () {
    let param = { test1: true }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
  it('Enum正确类型err返回', function () {
    let param = { test1: 'eee' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
});

describe('Array测试', function () {
  let options = [
    { key: 'test', required: false, type: 'Array' },
    { key: 'test1', required: true, type: 'Array' }];
  it('Array错误类型err返回', function () {
    let param = { test1: '123232' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
  it('Array正确类型err返回', function () {
    let param = { test1: ['eee'] }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
});


describe('Object测试', function () {
  let options = [
    { key: 'test', required: false, type: 'object' },
    {
      key: 'test2', required: false, type: 'object', options: [
        { key: 'a', required: true, type: 'string' },
        { key: 'b', required: true, type: 'number' },
        { key: 'c', required: false, type: 'string' },
      ]
    },
    { key: 'test1', required: true, type: 'object' }];
  it('Object错误类型err返回', function () {
    let param = { test1: '123232' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
  it('Object正确类型err返回', function () {
    let param = { test1: { a: 1, b: 2 } }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });

  it('Object递归类型err返回', function () {
    let param = { test1: { a: 1, b: 2 }, test2: { a: '12asds', b: 1232, c: 'xxx' } }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
});


describe('Date测试', function () {
  let options = [
    { key: 'test', required: false, type: 'date' },
    { key: 'test1', required: true, type: 'date' }];
  it('Date错误类型err返回', function () {
    let param = { test1: 'xxxxxx' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
  it('Date正确类型err返回', function () {
    let param = { test1: '2020-01-01 12:12:12' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
});

describe('Function测试', function () {
  let options = [
    {
      key: 'test', required: false, type: 'function', validate: function (val) {
        if (val > 10) return false;
        else return true
      }
    },
    {
      key: 'test1', required: true, type: 'function', validate: function (val) {
        if (val === 'aaa') return true
      }
    }];
  it('Function错误类型err返回', function () {
    let param = { test1: 'xxxxxx' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, -1);
  });
  it('Function正确类型err返回', function () {
    let param = { test: 1, test1: 'aaa' }
    let test = new Validate(options, param)
    let res = test.check();
    assert.equal(res.err, 0);
  });
});
