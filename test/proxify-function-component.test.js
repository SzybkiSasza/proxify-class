import {proxifyFunction} from '../src';

describe('Proxify function component tests', () => {
  it('Is a defined import', () => {
    expect(proxifyFunction).toBeInstanceOf(Function);
  });

  it('Proxifies a single function', () => {
    const original = (value) => {
      return value + 1;
    };

    const modifier = (value) => {
      return [value + 3];
    };

    const proxifiedFunction = proxifyFunction(original, modifier);
    expect(proxifiedFunction).not.toEqual(original);

    const result = proxifiedFunction(3); // 3 + 1 + 3;
    expect(result).toEqual(7);
  });

  it('Allows for modifying the result in callback', (done) => {
    const original = (name, callback) => {
      callback(null, `Entliczek ${name}`);
    };
    const sentenceModifier = (name, callback) =>
      [name, (err, result) => callback(err, `${result} Czerwony Stoliczek`)];

    console.log(proxifyFunction);

    const proxified = proxifyFunction(original, sentenceModifier);
    proxified('Pentliczek', (err, result) => {
      expect(err).toEqual(null);
      expect(result).toEqual('Entliczek Pentliczek Czerwony Stoliczek');
      done();
    });
  });
});
