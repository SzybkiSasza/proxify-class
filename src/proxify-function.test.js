jest.mock('./get-proxy');

import proxifyFunction from './proxify-function';
import getProxy from './get-proxy';

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

      it('Throws an error if modifier returns non-array-like arguments', () => {
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
    });
  });
});
