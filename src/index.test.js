import proxify from './';

describe('Main lib tests', () => {
  it('Is a defined function', () => {
    expect(proxify).toBeInstanceOf(Function);
  });

  it('Returns an object if supplied with object', () => {
    expect(proxify({})).toBeInstanceOf(Object);
  });

  it('Returns a function if supplied with function', () => {
    expect(proxify(() => {})).toBeInstanceOf(Function);
  });
});
