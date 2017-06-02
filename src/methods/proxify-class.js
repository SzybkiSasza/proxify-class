import clone from '../utils/clone-object';
import proxifyFunction from './proxify-function';

/**
 * Proxifies Class or Class instance
 * @param  {Function|Object} original     Original object or Function
 * @param  {Function} modifier            Modifier to apply to every
 *                                          proxified method
 * @param  {Function} decide              Optional decide function to choose
 *                                          which methods should be proxified
 * @param  {Object}   options             OPtions object
 * @return {Function|Object}              Resulting class or class instance
 */
export function proxifyClass(original, modifier, decide, options = {}) {
 const cloner = buildCloner(modifier, decide, options.passGenerator);

 return clone(original, cloner);
}

/**
 * Builds cloner that can be used with the clone-object
 * @param  {Function} modifier            Modifier to apply to every
 *                                          proxified method
 * @param  {Function} decide              Optional decide function to choose
 *                                          which methods should be proxified
 * @param  {Object}   generateModifier    Indicator that passed function is a
 *                                          generator that returns a modifier
 * @return {Function}                     CloneObject-compatible cloner
 */
function buildCloner(modifier, decide, generateModifier) {
  /**
   * Checks if given Function should be cloned and applies proxy, if needed
   * @param  {String}   propertyName        Property the function is attached to
   * @param  {Function} originalFunction    Function that might be proxified
   * @param  {Object}   target              Target (provided for a context)
   * @return {Function}                     Proxied clone or a normal clone
   */
  return function cloner(propertyName, originalFunction, target) {
    // If decider is present, omit proxifying process for negative decisions
    // We skip the constructor as well!
    if (decide && !decide(propertyName)) {
      return originalFunction.bind(target);
    }

    const generatedModifier = generateModifier ?
      modifier(propertyName) : modifier;

    return proxifyFunction(originalFunction, generatedModifier);
  };
}


export default proxifyClass;
