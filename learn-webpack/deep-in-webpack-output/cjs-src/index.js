const mdA = require('./module-a');
const { sayHello } = require('./module-a');

mdA.sayHello();
sayHello();

mdA.sayHello = null;

const mdA1 = require('./module-a');

console.log(mdA1);
