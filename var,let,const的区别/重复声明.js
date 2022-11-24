var a = 'ssxxxd';
var a = 'var a';
console.log(a);

// let a = 'let a' // SyntaxError: Identifier 'a' has already been declared
// const a = "const a" // SyntaxError: Identifier 'a' has already been declared
let b = "let b";
// let b = "let b";

// const b = "const b";
const c = "const c";


function fn(b)
{
    // b是已经存在的变量，所以let、const 不能再次声明b
    // let b = 'fn let b'; // SyntaxError: Identifier 'b' has already been declared
    // const b = 'fn const b'// SyntaxError: Identifier 'b' has already been declared
    var b = 'fn var b'
    console.log(b);
}

// fn(b);
fn(a);
