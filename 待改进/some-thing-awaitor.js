const LEN = 100;
// const DELAY = 1000;
export async function somethingAwaiter(i = 0, somethingIsEnable = () => true, mountedFlag = () => false, DELAY = 1000, tag = '')
{
    // if (import.meta.env.VITE_APP_ENV.startsWith("dev") && (!tag)) throw new Error('缺少tag参数！')
    if (!mountedFlag()) throw new Error(`${ tag }: 組件已卸載。`);
    if (somethingIsEnable()) return;
    if (window?.ProductionEnv?.DEBUG)
    {
        console.warn(`${ i },awaiting...`, somethingIsEnable);
    }
    await new Promise((res) =>
        setTimeout(() =>
        {
            res();
        }, DELAY)
    );
    if (somethingIsEnable()) return;
    else if (i < LEN)
    {
        // import.meta.env.VITE_APP_ENV.startsWith("dev") && console.warn({ tag })
        return somethingAwaiter(++i, somethingIsEnable, mountedFlag, DELAY, tag);
    }
    else
    {
        // import.meta.env.VITE_APP_ENV.startsWith("dev") && window.alert(tag || 'somethingAwaiter')
        throw new Error(`${ tag }: no data;(`);
    }
};
