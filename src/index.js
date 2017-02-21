/**
 * Proxifies the class or the method
 * @param  {Function|Object}  input   Function or object to proxify
 * @return {Function|Object}          Proxified object
 */
export default function proxify(input) {
  if (input instanceof Function) {
    return input;
  } else if (input instanceof Object) {
    return input;
  }
}
