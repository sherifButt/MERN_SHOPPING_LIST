import { items } from './items.js';
/**
 *
 * @param {array} obj object or array to count
 * @param {array} filter to be specified
 */

const countObject = (obj, filter) => {
   console.log('object');
};

const countArray = (array, filter) => {
   console.log('started to count array');
   
   let counter = 0;
   for (let i = 0; i < array.length; i++) {
      if (array[i].name) counter++;
   }
   return counter;
};

export const count = (obj, filter) => {
   if (Array.isArray(obj)) {
      const arrayCount = countArray(obj, filter);
      return arrayCount
   } else {
      countObject(obj, filter);
   }
};

console.log(count(items, { path: '_id', count: 'name' }));
