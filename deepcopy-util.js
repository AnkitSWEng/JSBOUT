/*Bout 1:
deep copy is about creating a new object that is a copy of an existing object, but 
having no references to the original object. This means that changes made to the new object will 
not affect the original object, and vice versa. This is useful when you want to create a new 
object that is similar to an existing one, but you want to ensure that they are completely 
independent of each other.*/

function deepClone(obj, hash = new WeakMap()) {
  // Case 1: primitives and null/undefined
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // Check for circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Handle Date objects
  if (Object.prototype.toString.call(obj) === "[object Date]") {
    const clone = new Date(obj.getTime());
    hash.set(obj, clone);
    // Clone any additional properties added to the Date object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key], hash);
      }
    }
    return clone;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const cloneArr = [];
    hash.set(obj, cloneArr);
    // Clone each element and own properties
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloneArr[key] = deepClone(obj[key], hash);
      }
    }
    return cloneArr;
  }

  // Handle regular objects
  const cloneObj = {};
  hash.set(obj, cloneObj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
}
// Primitives types test
console.assert(deepClone(42) == 42, "Test failed: 42 is not deep cloned");
console.assert(deepClone("hello") == "hello", "Test failed: 'hello' is not deep cloned");
console.assert(deepClone(true) == true, "Test failed: true is not deep cloned");
console.assert(deepClone(null) == null, "Test failed: null is not deep cloned");
console.assert(deepClone(undefined) == undefined, "Test failed: undefined is not deep cloned");
console.assert(Number.isNaN(deepClone(NaN)), "Test failed: NaN is not deep cloned");
console.assert(deepClone(Infinity) == Infinity, "Test failed: Infinity is not deep cloned");
console.assert(deepClone(-Infinity) == -Infinity, "Test failed: -Infinity is not deep cloned");

//Objects and arrays test
console.assert(deepClone({ a: 1 })["a"] == 1, "Test failed: { a: 1 } is not deep cloned");
const objArrayOriginal = [1, [2, { a: 3 }], { b: 4 }];
const objArrayCloned = deepClone(objArrayOriginal);
const isEqual = (objArrayOriginal, objArrayCloned) =>
  JSON.stringify(objArrayCloned) === JSON.stringify(objArrayOriginal);

console.assert(
  JSON.stringify(objArrayCloned) === JSON.stringify(objArrayOriginal),
  "Test failed: [1, [2, { a: 3 }], { b: 4 }] is not dsdsdeep cloned"
);

console.assert(
  deepClone(new Date()).getTime() == new Date().getTime(),
  "Test failed: Date is not deep cloned"
);
console.assert(
  deepClone([1, 2, 3]).toString() == [1, 2, 3].toString(),
  "Test failed: Array is not deep cloned"
);
console.assert(deepClone({ a: 1, b: 2 }).a == 1, "Test failed: Object is not deep cloned");
console.assert(deepClone({ a: 1, b: 2 }).b == 2, "Test failed: Object is not deep cloned");
