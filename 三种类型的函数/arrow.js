// arrow function
// "use strict"
const arrowFunc = () =>
{
  // console.log('new.target: ', new.target);//NOTE: SyntaxError: new.target expression is not allowed here (a
  console.log('this: ', this);//this可以根据调用方式不同而不同
  // yield { };
}

console.log(arrowFunc.__proto__);// Function.prototype
console.log(arrowFunc.__proto__ === Function.prototype);

console.log(arrowFunc.prototype);//undefined
// console.log(arrowFunc.prototype.__proto__ === Object.prototype);

// new arrowFunc();//NOTE: TypeError: arrowFunc is not a constructor
arrowFunc.bind({ name: 'new bounded this' })();//始终是window或者undefined
arrowFunc.apply({ name: 'new applied this' });//始终是window或者undefined
arrowFunc.call({ name: 'new called this' });//始终是window或者undefined

export { }
