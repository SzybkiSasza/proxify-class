/**
 * Gets all - both own and inherited - property names
 * @param  {Object} obj Input Object
 * @return {Object}     List of own and inherited property names
 */
export default function getAllPropertyNames(obj) {
  // Recursive stop - either when we have null or we have native Object
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
