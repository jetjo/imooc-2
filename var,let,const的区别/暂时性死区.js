let a = 'let a';
// var a = 'var a';// Uncaught SyntaxError SyntaxError: Identifier 'a' has already been declared
let b = 'let b';
var c = 'var c';
function fn()
{
    console.log(b);
    console.log(c);
    console.log(a); // Uncaught ReferenceError ReferenceError: Cannot access 'a' before initialization
    let a = 'fn let a'
    // let c = 'fn let c'
    var c = 'fn var c'
}

try
{
    fn()
} catch (error)
{
    console.timeLog(error)
}

console.info(`在一个作用域内，不论什么位置，只要用let声明了变量a，
在这个作用域内声明变量a的语句之前，如果使用到变量a，是不会去外层作用域寻找a的`);
