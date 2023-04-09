// import dayjs from "dayjs";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.7/+esm'

export const YCookie = (function _YCookie()
{
  if (_YCookie.bounded) return _YCookie;
  _YCookie.bounded = true;

  // 测试一下,更改_YCookie.test的成员值，或往_YCookie.test添加新成员，确认一下Object.freeze，Object.seal是否都是浅的
  _YCookie.test = {
    test: ''
  }

  // NOTE: 单例模式
  // const _YCookie = Object.create(null);
  //_YCookie.get绑定_YCookie作为上下文
  _YCookie.get = (function ()
  {
    return (name) =>
    {
      if (!name || !document.cookie) return;
      name = encodeURIComponent(name);
      // const reg = new RegExp(`${ name }=(?<value>.*?);\\b`);//, 'g');失败
      // const reg = new RegExp(`${ name }=(?<value>.+?);`);document.cookie='name='是合法的
      // const reg = new RegExp(`${ name }=(?<value>.*?);?`);//分号可能没有，如果是在末尾 失败
      // const reg = new RegExp(`${ name }=(?<value>.+?);?`);//失败 加问号只能匹配到value中的第一个字符
      // const reg = new RegExp(`${ name }=(?<value>.*);?`);//不行, 假如，cookie中有两个名字为campCode和campCode1的值，res的结果是：value; campCode1=xxx; campCodex=xxx
      // const reg = new RegExp(`${ name }=(?<value>[^;]*);?`);//不行, 结果同上
      // const reg = new RegExp(`${ name }=(?<value>[^;]*);?\b`);//不行, res是undefined
      // const reg = new RegExp(`${ name }=(?<value>[^\;\=\s]*);?`);// /{name}=(?<value>[^;=s]*);?/
      // NOTE: 正则中"[^\\;\\=\\s]"的后面的量词不能是“+”，因为假如当前路径下有对应名字的cookie,但是值是空字符串，则匹配不到了！！！
      // const reg = new RegExp(`${ name }=(?<value>[^\\;\\=\\s]+);?`, 'g');// /{name}=(?<value>[^;=s]*);?/
      const reg = new RegExp(`${ name }=(?<value>[^\\;\\=\\s]*);?`, 'g');// /{name}=(?<value>[^;=s]*);?/

      // reg.exec(document.cookie);
      const _ = reg.exec(document.cookie);
      let res = _?.groups?.value;
      //TODO: 不同domain、path的cookie的name是可以相同的，此处暂未考虑会有多个匹配的问题，
      // NOTE: 测试得不会有上述顾虑，比如在/cookie路径下的页面中声明两个同名cookie, 但是一个的path是“/”，另一个的path是“/cookie”，无论添加的顺序如何，
      // NOTE: 始终是越内层的路径下的cookie出现的最前面
      // NOTE: 只要是在/cookie路径对应的页面中读取document.cookie，所返回的字符串中，路径为‘/cookie’的cookie总是出现在字符串最前面
      // NOTE: 如果在“/”路径下访问document.cookie，返回的字符串中默认是没有path为“/cookie”的cookie的
      // NOTE: 可见document.cookie并不是一个简单的字段成员，更可能是一个getter/setter
      //TODO: 一种解决办法是存入时，以自定义的格式将domain和path存入value中
      res && (res = decodeURIComponent(res));
      console.log({ reg, cookie: document.cookie, regexpExecResult: _, result: res });
      // console.log(this, reg, document.cookie, _, res);
      return res;
    }
  }).call(_YCookie);


  _YCookie.set = (function ()
  {
    // NOTE: cookie是区分大小写的，并且cookie名字前后的空白字符不会被自动删除
    const SITE = ['lax', 'strict', 'none'];
    return (name, value, { expires, maxAge, domain, path = '/', secure, samesite } = {}) =>
    {
      // let expires = new Date();
      // expires = new Date(expires.getFullYear() + 3, 0, 1, 0, 0, 0, 0);
      if (!name) return;
      let s = `${ encodeURIComponent(name) }=${ encodeURIComponent(value) }; `;
      maxAge = Number(maxAge);
      if (!isNaN(maxAge))
      {
        s += `max-age=${ maxAge }; `;
      }
      if (expires && expires instanceof Date)
      {
        s += `expires=${ expires.toUTCString() }; `;
      }
      if (domain && typeof domain === 'string') 
      {
        s += `domain=${ encodeURI(domain) }; `;
      }
      if (path && typeof path === 'string') 
      {
        s += `path=${ encodeURI(path) }; `;
      }
      if (SITE.includes(samesite)) 
      {
        s += `samesite=${ samesite }; `;
      }
      if (secure)
      {
        s += `secure; `;
      }
      document.cookie = s;
      // s = document.cookie;
    }
  }).call(_YCookie);

  _YCookie.remove = (function ()
  {
    return (name, { domain, path = '/', secure } = {}) =>
    {
      if (!name || !document.cookie) return;
      _YCookie.set(name, '', { maxAge: -1, expires: new Date('1970-01-01'), domain, path, secure })//TODO: 已测试
      //NOTE: 单独使用maxAge或“expires: new Date('1970-01-01')”都能有效
    }
  }).call(_YCookie);

  // NOTE: 浅冻结 浅封闭
  return Object.freeze(Object.seal(_YCookie));
})()
