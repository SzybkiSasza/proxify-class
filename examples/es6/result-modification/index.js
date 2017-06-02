/* eslint-disable no-invalid-this */

const proxifyClass = require('../../../lib').proxifyClass;

/**
 * Test class for modifying callback results
 */
class TestClass {
  /**
   * Super simple method that returns result by the callback
   * @param  {String}   input         String to be modified and returned
   * @param  {Function} callback      Returning callback
   * @return {Function}               Returning callback
   */
  callbackExample(input, callback) {
    return callback(null, input + 'def');
  }
}

/**
 * Adds a few characters to the result when it's too long
 * @param  {String}   input    Input String
 * @param  {Function} callback Resulting callback
 * @return {Array}             Modified method parameters
 */
function truncateResult(input, callback) {
  const callbackWrapper = function(err, result) {
    let modifiedResult;

    if (result.length > 6) {
      modifiedResult = result + '_too-long!';
    } else {
      modifiedResult = result;
    }

    return callback(err, modifiedResult);
  };
  return [input, callbackWrapper];
}

const ProxifiedTest = proxifyClass(TestClass, truncateResult, false);
const proxifiedInstance = new ProxifiedTest();

// First usage - no trimming occuring
const str1 = 'abc';

console.log('No modification: ');
proxifiedInstance.callbackExample(str1, function(err, result) {
  console.log('Result: ', result);
});

// Second case - trimming the result
const str2 = 'abc1';

console.log('Modifying the result: ');
proxifiedInstance.callbackExample(str2, function(err, result) {
  console.log('Result: ', result);
});
