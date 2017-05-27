/* eslint-disable require-jsdoc */

import {proxifyClass} from '../src';

describe('Proxify class component tests', () => {
  it('Is a defined import', () => {
    expect(proxifyClass).toBeInstanceOf(Function);
  });

  it('Proxifies plain object', () => {
    const object = {
        a: 'val1',
        b: (input) => input + 3,
    };

    const modifier = (input) => [input * 2];

    const proxifiedObject = proxifyClass(object, modifier);
    expect(proxifiedObject.a).toEqual('val1');

    const result = proxifiedObject.b(4); // 4 * 2 + 3 = 11
    expect(result).toEqual(11);
  });

  it('Proxifies class and uses a proper "this" binding', () => {
    class A {
      constructor(input) {
        this.input = input;
      }

      methodA(value) {
        this.value = value + 2;
        return this.value;
      }
    }

    const modifier = function(value) {
      value = value * 3;
      return [value];
    };

    const ProxifiedA = proxifyClass(A, modifier);

    const aInstance = new ProxifiedA('abc');
    expect(aInstance.input).toEqual('abc');

    const result = aInstance.methodA(4); // 4 * 3 + 2 = 14
    expect(result).toEqual(14);
    expect(aInstance.value).toEqual(14);
  });

  it('Proxifies static methods', () => {
    class A {
      static multiplyBy(input, value) {
        return input * value;
      }
    }

    const modifier = function(input, value) {
      return [input + 1, value + 2];
    };

    const ProxifiedA = proxifyClass(A, modifier);

    const result = ProxifiedA.multiplyBy(2, 3); // (2 + 1) * (3 + 2) = 15
    expect(result).toEqual(15);
  });

  it('Proxifies specific class methods', () => {

  });

  it('Generates modifier with passed generator', () => {

  });
});
