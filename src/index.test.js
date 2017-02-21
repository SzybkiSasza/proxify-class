import index from './';

describe('Main lib tests', () => {
  it('Is a defined function', () => {
    expect(index).toBeInstanceOf(Function);
  });
});
