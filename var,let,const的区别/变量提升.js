console.log(a);
var a = 'var a';
console.log(a);

try
{
    console.log(b);// Cannot access 'b' before initialization
    let b = 'let b';
} catch (error)
{
    console.timeLog(error);
}
try
{
    console.log(c);// Cannot access 'c' before initialization
    const c = 'const c';
} catch (error)
{
    console.timeLog(error);
}


function fn()
{
    console.log(a);
    var a = 'fn var a';
}

fn();

console.info('ES6中的let、const不存在变量提升，迫使我们养成先声明后使用的好习惯，避免莫名其妙的BUG♥♥♥'); 
