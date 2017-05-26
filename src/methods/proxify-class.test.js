import {reduce} from 'lodash';

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

  it('Proxifies all the functions if decide is not present', () => {
    // Returns string - does not matter, we just want to check if it was run
    proxifyFunction.mockReturnValue('SHOULD BE PROXIFIED FUNCTION HERE');

    // Just a simple iteration over the properties and running cloner
    clone.mockImplementation((obj, cloner) =>
      reduce(obj, (memo, value, key) => {
        if (value instanceof Function) {
          memo[key] = cloner(value);
        } else {
          memo[key] = value;
        }

        return memo;
      }, {})
    );

    const original = {
      a: function() {},
      b: function() {},
      c: 123,
    };

    const clonedObject = proxifyClass(original, () => {});

    expect(clonedObject).toEqual({
      a: 'SHOULD BE PROXIFIED FUNCTION HERE',
      b: 'SHOULD BE PROXIFIED FUNCTION HERE',
      c: 123,
    });
  });

  it('Proxifies only the functions that decide returns true for', () => {
    // Returns string - does not matter, we just want to check if it was run
    proxifyFunction.mockReturnValue('SHOULD BE PROXIFIED FUNCTION HERE');

    // Just a simple iteration over the properties and running cloner
    clone.mockImplementation((obj, cloner) =>
      reduce(obj, (memo, value, key) => {
        if (value instanceof Function) {
          memo[key] = cloner(key, value);
        } else {
          memo[key] = value;
        }

        return memo;
      }, {})
    );

    const original = {
      a: function() {},
      b: function() {},
      c: 123,
    };

    const decide = (propertyName) => propertyName === 'a';
    const clonedObject = proxifyClass(original, () => {}, decide);

    expect(clonedObject).toEqual({
      a: 'SHOULD BE PROXIFIED FUNCTION HERE',
      b: expect.any(Function),
      c: 123,
    });
  });
});
