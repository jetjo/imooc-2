// const Ctor = (city) =>
function Ctor(city)
{
  if (!new.target) throw new TypeError('calling Ctor constructor without new is invalid');
  // NOTE: instanceof 检测一个构造函数的prototype是否出现在了this 实例的原型链上(__proto__-chain)
  // 对于bound- function： For bound functions, instanceof looks up for the prototype property on the target function, since bound functions don't have prototype.
  // 参见MDN： https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#description
  if (!(this instanceof Ctor))
  // if (!(this instanceof _))成立
  {
    throw new TypeError('必须是Ctor实例！')
  }
  city !== undefined && (this.city = city);
}

// // Ctor.prototype.desc = '我是Ctor.prototype'

// function _(city)
// {
//   this.city = city + ', in china!!!'
// }
// // _.prototype.desc = '我是_.prototype'

// NOTE: 测得，改变Ctor的prototype的构造函数为"_"，不会使得在new Ctor时调用到“_”，而是仍然调用Ctor,得到的实例仍然是Ctor的实例，不是“_”的实例，
// NOTE: 即“_”的prototype不会出现在实例的原型链上，改变Ctor.prototype.constructor.prototype不会影响Ctor.prototype，这是两码事。。。
// Ctor.prototype.constructor = _;
// Ctor.prototype.construct = _;
// delete Ctor.prototype.constructor;
// // NOTE: 并没有抛出异常。。。
// new Ctor();
// Reflect.constructor(Ctor, [])
// // delete Ctor.prototype.construct;


function CtorExtend(name, city)
{
  // const _ = Reflect.construct(Ctor, [city, name], CtorExtend);//捕获不了
  const _ = Reflect.construct(CtorProxy, [city, name], CtorExtend);
  _.name = name;
  return _;
  // if (!(this instanceof CtorExtend))
  // {
  //   return new CtorExtend(...arguments);
  // }
  // // Ctor.bind(this)(city, name);
  // this.name = name;
  // return this;
}

Reflect.setPrototypeOf(CtorExtend, Ctor);
// NOTE: Ctor.prototype在此处必须是Object或者null,而箭头函数的prototype是undefined
Reflect.setPrototypeOf(CtorExtend.prototype, Ctor.prototype || null);
// CtorExtend.prototype = new Ctor();
// CtorExtend.prototype.constructor = CtorExtend;


const CtorProxy = new Proxy(Ctor, {
  construct(target, args, newTarget)
  {
    console.log('Ctor被捕获了！');
    // target必须不能是箭头函数,箭头函数是Function的实例,去没有prototype属性，所以不能做构造函数
    return Reflect.construct(target, args || [], newTarget);
  }
});

// console.log({ CtorExtend, Ctor });

const i = CtorExtend('xy', 'fuck you moth!!!');
// const i = new CtorExtend('xy', 'fuck you moth!!!');

console.log(i);// CtorExtend的实例
console.log(i.__proto__);// Ctor的实例
console.log(i.__proto__.__proto__);// Object的实例

console.log(i instanceof CtorExtend);// CtorExtend的实例
console.log(i.__proto__ instanceof Ctor);// Ctor的实例
console.log(i.__proto__.__proto__ instanceof Object);// Object的实例

console.log(i.__proto__.constructor === CtorExtend);// Ctor的实例
console.log(i.__proto__.__proto__.constructor === Ctor);// Object的实例
console.log(i.__proto__.__proto__.__proto__.constructor === Object);
