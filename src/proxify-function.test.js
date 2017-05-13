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

  // An idea how to run exactly the same set of tests for two cases
  const getProxyTests = [{
    title: 'Proxify function - Proxy version',
    getProxyBehaviour: () => getProxy.mockReturnValue(Proxy)
  }, {
    title: 'Proxify function - non-Proxy version',
    getProxyBehaviour: () => getProxy.mockReturnValue(false)
  }];

  getProxyTests.forEach(proxyTest => {
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
    });
  });
});
