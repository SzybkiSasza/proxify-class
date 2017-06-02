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
    class A {
      multiplyBy(input, value) {
        return input * value;
      }

      specialPrefixPower(input, power) {
        return Math.pow(input, power);
      }
    }

    const modifier = function(input, power) {
      return [input, power * 2];
    };
    const decide = function(methodName) {
      return methodName.indexOf('specialPrefix') > -1;
    };

    const ProxifiedA = proxifyClass(A, modifier, decide);
    const proxifiedInstance = new ProxifiedA();

    // 2 ^ (3 * 2) => 2 ^ 6 = 64
    const result = proxifiedInstance.specialPrefixPower(2, 3);
    expect(result).toEqual(64);

    // 2 * 3 = 6
    const unmodifiedResult = proxifiedInstance.multiplyBy(2, 3);
    expect(unmodifiedResult).toEqual(6);
  });

  it('Generates modifier with passed generator', () => {
    class A {
      add(input, value) {
        return input + value;
      }
    }

    const listener = jest.fn();
    const modifier = function(methodName) {
      listener(methodName);
      return function(a, b) {
        return [a, b * 2];
      };
    };

    const ProxifiedA = proxifyClass(A, modifier, false, {
      passGenerator: true,
    });
    const proxifiedInstance = new ProxifiedA();

    // 2 + 3 * 2 = 8
    const result = proxifiedInstance.add(2, 3);

    expect(result).toEqual(8);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith('add');
  });
});
