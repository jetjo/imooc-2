// ordinary function
function ordinaryFunc()
{
  console.log('new.target: ', new.target);//正常工作
  console.log('this: ', this);//this可以根据调用方式不同而不同
  // yield { };
}

console.log(ordinaryFunc.__proto__);// Function.prototype
console.log(ordinaryFunc.__proto__ === Function.prototype);

console.log(ordinaryFunc.prototype);//Object的实例
console.log(ordinaryFunc.prototype.__proto__ === Object.prototype);

new ordinaryFunc();//正常工作
ordinaryFunc.bind({ name: 'new bounded this' })();//预期一致
ordinaryFunc.apply({ name: 'new applied this' });//预期一致
ordinaryFunc.call({ name: 'new called this' });//预期一致
