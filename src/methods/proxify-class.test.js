jest.mock('../utils/clone-object');
jest.mock('./proxify-function');

import clone from '../utils/clone-object';
import proxifyFunction from './proxify-function';

import proxifyClass from './proxify-class';

describe('Proxify Class', () => {
  it('Is a defined function', () => {
    expect(proxifyClass).toBeInstanceOf(Function);
  });

  it('Returns the same type of object', () => {
    const Input = class {};

    clone.mockReturnValueOnce(Input);
    const Proxified = proxifyClass(Input);
    expect(Proxified).toBeInstanceOf(Function);

    const input = {};
    clone.mockReturnValueOnce(input);
    const proxified = proxifyClass(input);
    expect(proxified).toBeInstanceOf(Object);
  });
});
