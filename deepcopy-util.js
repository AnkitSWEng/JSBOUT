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
}
