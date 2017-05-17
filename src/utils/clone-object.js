import {assign, cloneDeep, each} from 'lodash';

/**
 * Clones the object or class
 * @param  {Object|Function} original           Input object or class
 * @return {Object|Function}                    Resulting clone
 */
export default function clone(original) {
  if (original instanceof Function) {
    // Assign constructor
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
    assignProperties(original.prototype, Clone.prototype);

    return Clone;
  }

  return cloneDeep(original);
}

/**
 * Assigns own and inherited properties of the source to the target
 * Separated to enable recursive calls
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
  const propertyNames = Object.getOwnPropertyNames(original);
  each(propertyNames, (propertyName) => {
    target[propertyName] = original[propertyName].bind(target);
  });

  depth++;

  const prototype = Object.getPrototypeOf(original);
  return assignProperties(prototype, target, depth);
}
