const a = 'global const a';
function fn()
{
    const obj = {//对象不会形成块级作用域
        a: 'fn obj.a',
        run: function ()
        {
            let b = 'fn run b';
            console.log(a);
        }
    }
    obj.run();
}
fn();
