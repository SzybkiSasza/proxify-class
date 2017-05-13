/**
 * Proxifies a single function. Calls modifier for every functio invocation
 * @param  {Function} originalFunction   Original function to proxify
 * @param  {Function} modifier           Modifier to call before each function invocation
 * @return {Function}                    Proxified function
 */
export function proxifyFunction(originalFunction, modifier) {
  // Thanks to variable scoping, this works exactly as expected ;)
  const Proxy = getProxy();

  if (Proxy) {
    return new Proxy(originalFunction, {
      async apply(target, thisArg, argumentsList) {
        const modifiedArguments = modifier.apply(thisArg, argumentsList);
        return originalFunction.apply(thisArg, modifiedArguments);
      }
    });
  }

  // Fallback for environments not supporting Proxy
  return function() {
    const modifiedArguments = modifier.apply(this, arguments);
    return originalFunction.apply(this, modifiedArguments);
  };
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
