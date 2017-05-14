import proxifyClass from './proxify-class';

describe('Proxify Class', () => {
  it('Is a defined function', () => {
    expect(proxifyClass).toBeInstanceOf(Function);
  });
});
