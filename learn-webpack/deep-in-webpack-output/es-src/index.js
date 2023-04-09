import * as mdA from './module-a'
import { sayHello } from './module-a'

mdA.sayHello();
sayHello();

mdA.sayHello = null;
