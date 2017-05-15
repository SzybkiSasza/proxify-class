import {cloneDeep} from 'lodash';

import getAllPropertyNames from './get-all-property-names';

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
    const allPropertyNames = getAllPropertyNames(original.prototype);

    return original;
  }

  return cloneDeep(original);
}
