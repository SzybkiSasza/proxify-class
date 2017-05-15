import {clone} from 'lodash';

/**
 * Assigns own and inherited properties of the source to the target
 * @param  {Object} original    Original object
 * @param  {Object} target      Target object
 * @param  {Number} [depth=0]   Depth - to prevent circular dependencies
 * @return {Object}             Target object
 */
export default function assignProperties(original, target, depth = 0) {
  // Stop cases
  if (original === null || // No more inheritance
    !Object.prototype.isPrototypeOf(original) || // Deepest inheritance
    depth > 10) { // Probable circular dependency - simple stop
      return target;
  }

  // Assign own properties
  const propertyNames = Object.getOwnPropertyNames(original);
  each(propertyNames, (propertyName) => {
    target[propertyName] = clone(original[propertyName]);
  });

  depth++;

  const prototype = Object.getPrototypeOf(original);
  return assignProperties(prototype, target, depth);
}
