/* eslint-disable no-invalid-this */

const proxifyClass = require('../../../es6').proxifyClass;

/**
 * Test class for Permissions
 */
class TestClass {
  /**
   * Simple method to just pass user as an argument
   * @param  {Object} user              Some user context
   * @param  {Object} invokingUser      Invoking user - for permissions check
   * @return {String}                   User name
   */
  getName(user, invokingUser) {
    return user.name;
  }
}

const permissionsHandler = function(user, invokingUser) {
  // Simple check - only admin can read another user name
  if (invokingUser.role !== 'admin') {
    throw new Error('This user cannot read name of another User!');
  }

  return [user, invokingUser];
};

const ProxifiedTest = proxifyClass(TestClass, permissionsHandler, false);
const proxifiedInstance = new ProxifiedTest();

// First case - obtaining another user name by Admin
console.log('First try - allow operation.');
try {
  const name = proxifiedInstance.getName({
    name: 'abc',
  }, {
    role: 'admin',
  });
  console.log('Got name: ', name);
} catch (err) {
  console.log('This is not logged!');
}

// Second case - unprivileged user tries to obtain another users name
console.log('Second try - deny operation.');
try {
  const name = proxifiedInstance.getName({
    name: 'abc',
  }, {
    role: 'user',
  });
  console.log('Got name: ', name);
} catch (err) {
  console.log('Caught an error: ', err.message);
}
