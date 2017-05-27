import {proxifyClass} from '../src';

describe('Proxify class component tests', () => {
  it('Is a defined import', () => {
    expect(proxifyClass).toBeInstanceOf(Function);
  });
});
