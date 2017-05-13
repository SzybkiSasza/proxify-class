import {proxifyFunction, getProxy} from './proxify-function';

describe('Proxify function', () => {
  it('Is a defined export', () => {
    expect(proxifyFunction).toBeInstanceOf(Function);
  });

  describe('Proxy getter', () => {
    it('Gets the Proxy, if available', () => {
      const proxy = getProxy();
      expect(proxy).toBeInstanceOf(Function);
    });

    it('Returns false, if proxy is unavailable', () => {
      // Mock getter on global, to simulate getting undefined property
      Object.defineProperty(global, 'Proxy', {
        get: function() {
          throw new Error('Proxy is undefined');
        }
      });

      const proxy = getProxy();
      expect(proxy).toEqual(false);
    });
  });

  describe('Proxify function', () => {
    it('Throws an error if original function is not a function', () => {
      try {
        proxifyFunction({}, {});

        // In order to terminate try and always trigger catch, this line exists...
        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toEqual('Original Function must be a function!');
      }
    });

    it('Throws an error when modifier is missing', () => {
      try {
        proxifyFunction(() => {});

        // In order to terminate try and always trigger catch, this line exists...
        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toEqual('Modifier must be a function!');
      }
    });

    it('Throws an error when modifier is not a function', () => {
      try {
        proxifyFunction(() => {}, {});

        // In order to terminate try and always trigger catch, this line exists...
        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toEqual('Modifier must be a function!');
      }
    });
  });
});
