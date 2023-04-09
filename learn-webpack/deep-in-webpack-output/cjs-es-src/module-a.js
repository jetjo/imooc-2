import { arr } from "./module-b";

// NOTE: 测得，webpack环境下，如果是CJS 模块，this是模块本身
// NOTE: 但是此时打印，模块还未导出，所以是空对象
console.log(this, '模块顶层this');
function sayHello()
{
  console.log(this, '这里的this就由如何调用决定了');
  Array.prototype.forEach.apply(arr, [(e, i) => console.log(e, i)]);
  console.log(Array.prototype.toString.call(arr));
}

export { sayHello }

console.log(this, '模块顶层this');
