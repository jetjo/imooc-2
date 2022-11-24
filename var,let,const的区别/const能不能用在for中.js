'use strict';

const array = [11, 21, 31, 41, 51, 61, 71, 81, 91, 101]

const obj = { name: 'Gigi', age: 18, height: 180 }

// for (const index = 0; index < array.length; index++) TypeError: Assignment to constant variable.
for (let index = 0; index < array.length; index++)
{
    const element = array[index];
    console.log({ element });
}

// for (const iterator of obj) obj is not iterable
for (const iterator of array)
{
    console.log({ iterator });
}

for (const key in array)
{
    console.log({ key });
    // if (Object.hasOwnProperty.call(array, key))
    // {
    //     const element = array[key];
    //     console.log({ element });
    // }
}
