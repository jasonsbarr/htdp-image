/**
 * Restricts a number to within certain min/max bounds
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (num, min, max) =>
  num > max ? max : num < min ? min : num;

/**
 * Clones an object recursively and preserves prototype/instanceof semantics
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export const clone = (obj) => {
  // if it's not an object, return it for a recursive base case
  if (typeof obj !== "object" || obj === null) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(clone);
  } else if (obj instanceof Map) {
    let map = new Map();
    for (let [k, v] of obj) {
      map.set(k, clone(v));
    }
    return map;
  } else if (obj instanceof Set) {
    let set = new Set();
    for (let v of obj) {
      set.add(clone(v));
    }
    return set;
  } else if (obj instanceof Date || obj instanceof RegExp) {
    return obj;
  }

  // if it's an object, continue on
  const p = Object.getPrototypeOf(obj);
  // this should always be p, but just in case...
  let proto = p
    ? p
    : obj.__proto__
    ? Object.create(obj.__proto__)
    : obj.constructor
    ? Object.create(obj.constructor.prototype)
    : // as a last resort, just copy the damned thing as its own prototype
      Object.create(obj);
  let newObj = {};

  Object.setPrototypeOf(newObj, proto);

  for (let [k, v] of Object.entries(obj)) {
    if (typeof v === "object" && v !== null) {
      if (Array.isArray(v)) {
        newObj[k] = v.map(clone);
      } else if (v instanceof Map) {
        let map = new Map();
        for (let [k2, v2] of v) {
          map.set(k2, clone(v2));
        }
        newObj[k] = map;
      } else if (v instanceof Set) {
        let set = new Set();
        for (let v2 of v) {
          set.add(clone(v2));
        }
        newObj[k] = set;
      } else {
        // for Date or RegExp just use the original value
        newObj[k] = v;
      }
    } else {
      // is primitive
      newObj[k] = v;
    }
  }

  return newObj;
};
