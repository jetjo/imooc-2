import * as mdA from './module-a'
import { sayHello } from './module-a'

mdA.sayHello();
sayHello();

mdA.sayHello = null;

import * as mdA1 from './module-a'

console.log(mdA1, mdA, mdA === mdA1);
