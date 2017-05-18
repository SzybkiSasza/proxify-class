import clone from '../utils/clone-object';
import proxifyFunction from './proxify-function';

/**
 * Proxifies Class or Class instance
 * @param  {Function|Object} original     Original object or Function
 * @param  {Function} modifier            Modifier to apply to every
 *                                          proxified method
 * @param  {Function} decide              Optional decide function to choose
 *                                          which methods should be proxified
 * @return {Function|Object}              Resulting class or class instance
 */
export function proxifyClass(original, modifier, decide) {
  // First - clone the original
  const cloned = clone(original);

  // Proxify object and class separately
  if (original instanceof Object) {

  } else {
    
  }

  return cloned;
}

export default proxifyClass;
