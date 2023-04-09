import { arr } from "./module-b";

// NOTE: 测得，webpack环境下, 对于ES模块，打包时就被直接替换成了undefined（是为了遵循规范？？？，严格模式下，全局this是undefined）
console.log(this, '模块顶层this');
function sayHello()
{
  console.log(this, '这里的this就由如何调用决定了');
  Array.prototype.forEach.apply(arr, [(e, i) => console.log(e, i)]);
  console.log(Array.prototype.toString.call(arr));
}

export { sayHello }
