/* eslint-disable no-invalid-this */

const proxifyClass = require('../../../lib').proxifyClass;

/**
 * Test class for Async DB
 */
class TestClass {
  /**
   * Asynchronously returns user name
   * @param {Object} user       User object - here it's always the object
   * @return {Promise<String>}  User name
   */
  getName(user) {
    return Promise.resolve(user.name);
  }
}

/**
 * Asynchronously gets User object
 * @param  {String} userId            User ID to obtain
 * @return {Promise<Object>}          Returned User
 */
function asyncGetUser(userId) {
  // Just return object with some fictional name here
  return Promise.resolve({
    _id: 'userId',
    name: 'Some Name from the DB',
  });
};

const dbEnrich = function(user) {
  if (typeof user === 'string') {
    return asyncGetUser(user).then((user) => {
      return [user];
    });
  }

  return Promise.resolve([user]);
};

const ProxifiedTest = proxifyClass(TestClass, dbEnrich, false);
const proxifiedInstance = new ProxifiedTest();

// Return name taken from passed object
proxifiedInstance.getName({
  _id: 'abc',
  name: 'Name Already Passed',
}).then((userName) => {
  console.log('Username passed:', userName);
});

// Get the user from asynchronous source
proxifiedInstance.getName('abc').then((userName) => {
  console.log('Username obtained asynchronously:', userName);
});
