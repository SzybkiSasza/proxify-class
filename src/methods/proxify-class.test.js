jest.mock('')

import proxifyClass from './proxify-class';

describe('Proxify Class', () => {
  it('Is a defined function', () => {
    expect(proxifyClass).toBeInstanceOf(Function);
  });

  it('Returns the same type of object', () => {
    const Input = class {};
    const Proxified = proxifyClass(Input);
    expect(Proxified).toBeInstanceOf(Function);

    const input = {};
    const proxified = proxifyClass(input);
    expect(proxified).toBeInstanceOf(Object)
  });
});
