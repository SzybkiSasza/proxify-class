/* eslint-disable require-jsdoc */

import {proxifyClass} from '../src';

// We don't test proxify-function here, as essentially all the cases are
// covered in its unit tests (no external dependencies there).
describe('Component tests', () => {
  it('Is a defined export', () => {
    expect(proxifyClass).toBeInstanceOf(Function);
  });

  describe('Proxify plain object', () => {
    it('Proxifies a plain object', () => {
      const plainObject ={
        a: 3,
        b: (input) => input + 1
      };
      const nastyModifier = (input) => input - 2;

      const proxifiedObject = proxifyClass(plainObject, nastyModifier);

      const result = proxifiedObject.b(3); // 3 - 2 + 1 = 2;
      expect(result).toEqual(2);
    });
  });

  describe('Proxify Class', () => {
    it('Proxifies a simple class', () => {
      const Original = class {
        add(input) {
          return input++;
        }
      };

      const modifier = function(input) {
        return input - 2;
      }

      const Proxified = proxifyClass(Original, modifier);
    });

    it('Includes the constructor', () => {

    });
  });

  describe('Proxify Class instance', () => {

  });
});
