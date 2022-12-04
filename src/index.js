import 'core-js/stable'

import './css/index.css'

import img from './images/Lmlp6O.jpg'

console.log(this, 'hello world');

console.log(img);

// if (typeof this !== 'undefined')
// {
//     throw new Error('必须是模块环境！')
// }

// const { resolve } = require("uri-js");


let name = 'Alex';
const age = 18;

const add = (x, y) => x + y;

new Promise((resolve, reject) =>
{
    resolve('成功')
}).then(value =>
{
    console.log(value);
})

console.log(Array.from([1, 2]));

class Person
{
    constructor(name, age)
    {
        Object.assign(this, { name, age });
    }
}

new Person('alex', 18);

// window.onload = () =>
// {
// setTimeout(() =>
// {
console.log('我加载了');
const e = document.createElement('img');
e.src = img;
e.alt = '从js创建'
document.body.appendChild(e);
//     console.log('我加载了');

// }, 5000);

// }
