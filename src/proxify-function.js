import getProxy from './get-proxy';

/**
 * Proxifies a single function. Calls modifier for every functio invocation
 * @param  {Function} originalFunction   Original function to proxify
 * @param  {Function} modifier           Modifier to call before each function invocation
 * @return {Function}                    Proxified function
 */
export function proxifyFunction(originalFunction, modifier) {
  if (!(originalFunction instanceof Function)) {
    throw new Error('Original Function must be a function!');
  }

  if (!(modifier instanceof Function)) {
    throw new Error('Modifier must be a function!');
  }

  // Thanks to variable scoping, this works exactly as expected ;)
  const Proxy = getProxy();

  if (Proxy) {
    return new Proxy(originalFunction, {
      apply(target, thisArg, argumentsList) {
        const modifiedArguments = getModifiedArguments(
          modifier, thisArg, argumentsList);
        return originalFunction.apply(thisArg, modifiedArguments);
      }
    });
  }

  // Fallback for environments not supporting Proxy
  return function() {
    const modifiedArguments = getModifiedArguments(modifier, this, arguments);
    return originalFunction.apply(this, modifiedArguments);
  };
}

export default proxifyFunction;

/**
 * Gets modified arguments from the modifier and checks if they are Array
 * If they are not, throws an understandable error
 * @param  {Function} modifier      Modifier function
 * @param  {Object} thisArg         "This" context
 * @param  {Array} argumentsList    Input arguments list
 * @return {Array}                  Modified arguments
 */
function getModifiedArguments(modifier, thisArg, argumentsList) {
  const modifiedArguments = modifier.apply(thisArg, argumentsList);

  if (!(modifiedArguments instanceof Array)) {
    throw new Error('Modifier returned non-array arguments!');
  }

  return modifiedArguments;
}
