/* eslint-disable no-invalid-this */

jest.mock('../utils/get-proxy');

import proxifyFunction from './proxify-function';
import getProxy from '../utils/get-proxy';

describe('Proxify function', () => {
  it('Is a defined export', () => {
    expect(proxifyFunction).toBeInstanceOf(Function);
  });

  describe('Proxify function - arguments checks', () => {
    // Please note - "Not Reached" errors are to check whether
    // the error is thrown from the library in every case

    it('Throws an error if original function is not a function', () => {
      try {
        proxifyFunction({}, {});
        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toEqual('Original Function must be a function!');
      }
    });

    it('Throws an error when modifier is missing', () => {
      try {
        proxifyFunction(() => {});
        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toEqual('Modifier must be a function!');
      }
    });

    it('Throws an error when modifier is not a function', () => {
      try {
        proxifyFunction(() => {}, {});
        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toEqual('Modifier must be a function!');
      }
    });
  });

  // We must run exactly the same tests two times for Proxy/non-Proxy scenarios
  const getProxyTests = [{
    title: 'Proxify function - Proxy version',
    getProxyBehaviour: () => getProxy.mockReturnValue(Proxy),
  }, {
    title: 'Proxify function - non-Proxy version',
    getProxyBehaviour: () => getProxy.mockReturnValue(false),
  }];

  getProxyTests.forEach((proxyTest) => {
    describe(proxyTest.title, () => {
      beforeAll(() => {
        proxyTest.getProxyBehaviour();
      });

      it('Returns new function', () => {
        const original = () => {};
        const modifier = () => {};

        const proxified = proxifyFunction(original, modifier);
        expect(original).not.toEqual(proxified);
      });

      it('Throws an error if modifier returns non-array arguments', () => {
        const original = (argument) => argument;

        // This should be an Array-like object!
        const modifier = (argument) => !argument;

        const proxified = proxifyFunction(original, modifier);

        try {
          proxified(true);
          throw new Error('This is not reached');
        } catch (err) {
          expect(err.message).toEqual('Modifier returned non-array arguments!');
        }
      });

      it('Modifies the passed argument in proxified function', () => {
        const original = (input) => input + 1;
        const modifier = (input) => [input + 2];

        const proxified = proxifyFunction(original, modifier);
        const result = proxified(2); // 2 + 1 + 2 = 5;

        expect(result).toEqual(5);
      });

      it('Supports multiple arguments', () => {
        const original = (a, b) => a + b;
        const modifier = (a, b) => [a * 2, b * 3];

        const proxified = proxifyFunction(original, modifier);
        const result = proxified(1, 2); // (1 * 2) + (2 * 3) = 8;

        expect(result).toEqual(8);
      });

      it('Properly passes "this" context', () => {
        const thisBinding = {
          multiply: (input, times) => input * times,
        };

        const original = function(input) {
          if (this.multiply) {
            return this.multiply(input, 2);
          }
          return 0;
        };

        const modifier = function(input) {
          if (this.multiply) {
            return [this.multiply(input, 3)];
          }
          return [0];
        };

        const proxified = proxifyFunction(original, modifier);
        const result = proxified.apply(thisBinding, [4]); // 4 * 3 * 2

        // Both modifier and original one used a proper "this" context!
        expect(result).toEqual(24);
      });

      it('Supports callbacks', (done) => {
        const original = (name, callback) => {
          callback(null, `My name is ${name}`);
        };
        const jamesModifier = (name, callback) =>
          [`${name}, James ${name}`, callback];

        const proxified = proxifyFunction(original, jamesModifier);
        proxified('Bond', (err, result) => {
          expect(err).toEqual(null);
          expect(result).toEqual('My name is Bond, James Bond');
          done();
        });
      });

      it('Supports an interesting way of modifying returned values!', () => {
        const jamesOriginalModifier = (name, callback) => {
          callback(null, `${name}, James ${name}`);
        };
        const sentenceModifier = (name, callback) =>
          [name, (err, result) => `My name is ${result}`];

        const proxified = proxifyFunction(jamesOriginalModifier,
          sentenceModifier);
        proxified('Pond', (err, result) => {
          expect(err).toEqual(null);
          expect(result).toEqual('My name is Pond, James Pond');
          done();
        });
      });

      it('Supports asynchronous original functions', async () => {
        const original = async (input) => input + 1;
        const modifier = (input) => [input + 3];

        const proxified = proxifyFunction(original, modifier);

        const result = await proxified(3); // 3 + 3 + 1
        expect(result).toEqual(7);
      });

      it('Supports asynchronous modifiers', async () => {
        const original = async (input) => input + 26;
        const modifier = async (input) => [input + 13];

        const proxified = proxifyFunction(original, modifier);

        const answerToEverything = await proxified(3); // 3 + 6 + 2
        expect(answerToEverything).toEqual(42);
      });

      it('Throws an error if modifier returns non-array async arguments',
      async () => {
        const original = async (argument) => argument;

        // This should be an Array-like object!
        const modifier = async (argument) => !argument;

        const proxified = await proxifyFunction(original, modifier);

        try {
          await proxified(true);
          throw new Error('This is not reached');
        } catch (err) {
          expect(err.message).toEqual('Modifier returned non-array arguments!');
        }
      });
    });
  });
});
