import {cloneDeep, difference, each} from 'lodash';

// List of non-enumerables - when checking Function.prototype
// We have to skip assigning them, as they are mostly read-only and internal
const nonEnumerables = [
  'length',
  'name',
  'arguments',
  'caller',
  'apply',
  'bind',
  'call',
  'prototype',
  'toString',
];

/**
 * Clones the object or class
 * @param  {Object|Function} original           Input object or class
 * @return {Object|Function}                    Resulting clone
 */
export default function clone(original) {
  if (original instanceof Function) {
    let Clone = class extends original {
      /**
       * Simple constructor wrapper - to clone
       * @param  {Array} args  Input arguments
       */
      constructor(...args) {
        super(...args);
      }
    };

    // Recursively clone everything!
    assignProperties(original, Clone);

    return Clone;
  }

  return cloneDeep(original);
}

/**
 * Assigns own and inherited properties of the source to the target
 * Separated to enable recursive calls
 * This method mutates the target!!!
 *
 * @param  {Object} original    Original object
 * @param  {Object} target      Target object
 * @param  {Number} [depth=0]   Depth - to prevent circular dependencies
 * @return {Object}             Target object
 */
function assignProperties(original, target, depth = 0) {
  // Stop cases
  if (original === null || // No more inheritance
    !Object.prototype.isPrototypeOf(original) || // Deepest inheritance
    depth > 10) { // Probable circular dependency - simple stop
      return target;
  }

  // Assign own properties
  let propertyNames = Object.getOwnPropertyNames(original);

  // Skip non-enumerables
  propertyNames = difference(propertyNames, nonEnumerables);

  each(propertyNames, (propertyName) => {
    if (original[propertyName] instanceof Function) {
      target[propertyName] = original[propertyName].bind(target);
    } else {
      target[propertyName] = cloneDeep(original[propertyName]);
    }
  });

  depth++;

  const prototype = Object.getPrototypeOf(original);

  // Top-level assign - called for Class definition, probably.
  // Skip Function.prototype and use a class one
  if (Function.prototype.isPrototypeOf(original)) {
    return assignProperties(original.prototype, target.prototype, depth);
  }

  return assignProperties(prototype, target, depth);
}
