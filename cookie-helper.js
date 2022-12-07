import dayjs from "dayjs";

export function YCookie()
{
    return YCookie;
}

//YCookie.get绑定YCookie作为上下文
YCookie.get = (function ()
{
    return (name) =>
    {
        if (!name || !document.cookie) return;
        name = encodeURIComponent(name);
        // const reg = new RegExp(`${ name }=(?<value>.*?);\\b`);//, 'g');失败
        // const reg = new RegExp(`${ name }=(?<value>.+?);`);document.cookie='name='是合法的
        // const reg = new RegExp(`${ name }=(?<value>.*?);?`);//分号可能没有，如果是在末尾 失败 
        // const reg = new RegExp(`${ name }=(?<value>.+?);?`);//失败 加问号只能匹配到value中的第一个字符
        const reg = new RegExp(`${ name }=(?<value>.*);?`);
        let res = reg.exec(document.cookie)?.groups?.value;//TODO: 不同domain、path的cookie的name是可以相同的，此处暂未考虑会有多个匹配的问题，
        //TODO: 一种解决办法是存入时，以自定义的格式将domain和path存入value中
        res && (res = decodeURIComponent(res));
        return res;
    }
}).call(YCookie);


YCookie.set = (function ()
{
    return (name, value, { expires, maxAge, domain, path = '/', secure } = {}) =>
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
        if (secure)
        {
            s += `secure; `;
        }
        document.cookie = s;
        s = document.cookie;
    }
}).call(YCookie);

YCookie.remove = (function ()
{
    return (name) =>
    {
        if (!name || !document.cookie) return;
        YCookie.set(name, '', { maxAge: -1 })//TODO: 未测
    }
}).call(YCookie);
