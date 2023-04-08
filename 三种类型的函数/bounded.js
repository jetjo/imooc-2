// bounded function
function ordinaryFunc()
{
  console.log('new.target: ', new.target);//正常工作
  console.log('this: ', this);//只有使用new或者Reflect.construct调用时，this才会改变
  // yield { };
}

const boundedFunc = ordinaryFunc.bind({ name: 'ordinary function\'s new bounded this!' });

console.log(boundedFunc.__proto__);// Function.prototype
console.log(boundedFunc.__proto__ === Function.prototype);

console.log(boundedFunc.prototype);//undefined
// console.log(boundedFunc.prototype.__proto__ === Object.prototype);

new boundedFunc();//正常工作
boundedFunc.bind({ name: 'new bounded this' })();//始终是初次调用bind时传递的this
boundedFunc.apply({ name: 'new applied this' });//始终是初次调用bind时传递的this
boundedFunc.call({ name: 'new called this' });//始终是初次调用bind时传递的this
