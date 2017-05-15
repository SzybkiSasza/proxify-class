import {cloneDeep, isEmpty} from 'lodash';

/**
 * Clones the object or class
 * @param  {Object|Function} original           Input object or class
 * @return {Object|Function}                    Resulting clone
 */
export default function clone(original) {
  if (original instanceof Function) {
    // Create an empty class
    const Clone = class {};

    // Rewrite the constructor - the only one that is not cloned!
    Clone.prototype.constructor = original.prototype.constructor;

    // Get all the property names
    console.log(getAllPropertyNames(original.prototype));

    return original;
  }

  return cloneDeep(original);
}

/**
 * Gets all - both own and inherited - property names
 * @param  {Object} obj Input Object
 * @return {Object}     List of own and inherited property names
 */
function getAllPropertyNames(obj) {
  // Recursive stop - either when we have null or we have Object
  if (obj === null || !Object.prototype.isPrototypeOf(obj)) {
    return false;
  }

  const propertyNames = Object.getOwnPropertyNames(obj);
  const inheritedPropertyNames = getAllPropertyNames(
    Object.getPrototypeOf(obj));

  return {
    propertyNames,
    inheritedPropertyNames,
  };
}
