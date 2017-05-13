import getProxy from './get-proxy';

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
