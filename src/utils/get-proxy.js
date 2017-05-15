/**
 * Gets proxy object if available
 * @return {Object|Boolean}   Proxy object, if available or false, if not
 */
export default function getProxy() {
  try {
    // Does not matter if it's attached to 'global' or 'window' ;)
    return Proxy;
  } catch (err) {
    return false;
  }
}
