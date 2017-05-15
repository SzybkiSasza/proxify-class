/* eslint-disable no-invalid-this */

import getProxy from '../utils/get-proxy';

/**
 * Proxifies a single function. Calls modifier for every functio invocation
 * @param  {Function} originalFunction   Original function to proxify
 * @param  {Function} modifier           Modifier to call before each invocation
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
        const modifiedArguments = modifier.apply(thisArg, argumentsList);
        return callOriginalFunction(originalFunction, thisArg,
          modifiedArguments);
      },
    });
  }

  // Fallback for environments not supporting Proxy
  return function(...args) {
    const modifiedArguments = modifier.apply(this, args);
    return callOriginalFunction(originalFunction, this, modifiedArguments);
  };
}

/**
 * Returns the result from calling the original function
 * Additionally, checks if the modified arguments are not a promise
 * @param  {function}  originalFunction               Original function
 * @param  {object} thisArg                           "This" context
 * @param  {Array|Promise<Array>}  modifiedArguments [description]
 * @return {[type]}                    [description]
 */
function callOriginalFunction(originalFunction, thisArg, modifiedArguments) {
  // Check if the returned arguments are promise
  if (Promise.resolve(modifiedArguments) === modifiedArguments) {
    return modifiedArguments.then((resolvedArguments) => {
      if (!(resolvedArguments instanceof Array)) {
        throw new Error('Modifier returned non-array arguments!');
      }

      return originalFunction.apply(thisArg, resolvedArguments);
    });
  }

  if (!(modifiedArguments instanceof Array)) {
    throw new Error('Modifier returned non-array arguments!');
  }

  return originalFunction.apply(thisArg, modifiedArguments);
}

export default proxifyFunction;
