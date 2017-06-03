/* eslint-disable no-invalid-this */

const proxifyClass = require('../../../es5').proxifyClass;

/**
 * Assigns console.log to the class instance as a default logger
 * Done only to show that 'this' bindings still work as expected
 */
const TestClass = function() {
  this.logger = console;
};

/**
 * Single argument method
 * @param  {Number} value Value to be incremented
 * @return {Number}       Incremented value
 */
TestClass.prototype.methodA = function(value) {
  return value + 123;
};

/**
 * Method with two arguments - to show that modifier
 * can support different method signatures
 * @param  {Number} a     First input
 * @param  {Number} b     Second input
 * @return {Number}       Operation result
 */
TestClass.prototype.methodB = function(a, b) {
  return a + 2 * b;
};

const loggerGenerator = function(methodName) {
  return function(...args) {
    this.logger.info(`[method:${methodName}] Arguments: `, args);
    return [...args];
  };
};

const ProxifiedTest = proxifyClass(TestClass, loggerGenerator, false, {
  // This is important - thanks to this, we have method names!
  passGenerator: true,
});

const test = new ProxifiedTest();

// Invocations go here!
test.methodA(1);
test.methodB(2, 3);
test.methodA(4);
