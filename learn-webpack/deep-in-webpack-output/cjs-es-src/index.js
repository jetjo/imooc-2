const mdA = require('./module-a');
const { sayHello } = require('./module-a');
// import * as mdA from './module-a';
// import { sayHello } from './module-a';

mdA.sayHello();
sayHello();

// NOTE: 因为本文件是CJS 模块，打包后，默认不会在文件开头插入“use strict”， 因此本文件（实际在一个函数体内）运行在非严格模式，所以
// NOTE: 虽然mdA是ES模块，sayHello是个getter，下面的语句无效，但是不会抛出异常
mdA.sayHello = null;

const mdA1 = require('./module-a');
// import * as mdA1 from './module-a';

console.log(mdA1, mdA, mdA === mdA1);
