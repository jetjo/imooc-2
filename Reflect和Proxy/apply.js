function ordinaryFunc()
{
  console.log('我被apply了', { arguments, thisArg: this });
}
const funcProxy = new Proxy(ordinaryFunc, {
  apply(target, thisArg, args)
  {
    console.log('捕获到了ordinaryFunc的apply', { arguments, thisArg: this });
    // console.log('target === ordinaryFunc //', target === ordinaryFunc);
    // return Reflect.apply(...arguments)
    // NOTE: Reflect.apply的args不能省略
    // return Reflect.apply(target, thisArg)// caught TypeError: CreateListFromArrayLike called on non-object
    return Reflect.apply(target, thisArg, args || [])
  }
});
ordinaryFunc();//不能捕获
ordinaryFunc.apply(null);//不能捕获
ordinaryFunc.call(null);//不能捕获

funcProxy();
funcProxy.apply(null);
funcProxy.call(null);
