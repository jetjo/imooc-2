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
        const reg = new RegExp(`${ name }=(?<value>.*?);`);
        return reg.exec(document.cookie)?.groups?.value;//TODO: 不同domain、path的cookie的name是可以相同的，此处暂未考虑会有多个匹配的问题，
        //TODO: 一种解决办法是存入时，以自定义的格式将domain和path存入value中
    }
}).call(YCookie);


YCookie.set = (function ()
{
    return (name, value, { expires, maxAge, domain, path, secure } = {}) =>
    {
        if (!name) return;
        let s = `${ encodeURIComponent(name) }=${ encodeURIComponent(value) }`;
        expires = Number(expires);
        if (!isNaN(expires))
        {
            s += `; expires=${ expires }`;
        }
        if (maxAge && dayjs(maxAge).isValid())
        {
            s += `; max-age=${ dayjs(maxAge).format('YYYY-MM-DD HH:mm:ss') }`;
        }
        if (domain && typeof domain === 'string') 
        {
            s += `; domain=${ encodeURI(domain) }`;
        }
        if (path && typeof path === 'string') 
        {
            s += `; domain=${ encodeURI(path) }`;
        }
        if (secure)
        {
            s += `; secure`;
        }
        document.cookie = s;
    }
}).call(YCookie);

YCookie.remove = (function ()
{
    return (name) =>
    {
        if (!name || !document.cookie) return;
        YCookie.set(name, '', { expires: -1 })
    }
}).call(YCookie);
