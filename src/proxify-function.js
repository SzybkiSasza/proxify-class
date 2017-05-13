/**
 * Proxifies a single function. Calls modifier for every functio invocation
 * @param  {Function} originalFunction   Original function to proxify
 * @param  {Function} modifier           Modifier to call before each function invocation
 * @return {Function}                    Proxified function
 */
export function proxifyFunction(originalFunction, modifier) {

}

/**
 * Gets proxy object if available
 * @return {Object|Boolean}   Proxy object, if available or false, if not
 */
export function getProxy() {
  try {
    // Does not matter if it's attached to 'global' or 'window' ;)
    return Proxy;
  } catch (err) {
    return false;
  }
}

export default proxifyFunction;
