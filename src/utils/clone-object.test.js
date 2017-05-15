/* eslint-disable require-jsdoc */

import clone from './clone-object';

describe('Clone Object', () => {
  it('Is a defined function', () => {
    expect(clone).toBeInstanceOf(Function);
  });

  it('Clones deep the object as it is', () => {
    const original = {
      x: 1,
      y: () => 2,
      z: function() {
        return 3;
      },
    };

    const clonedObj = clone(original);
    original.z = function() {
      return 5;
    };

    // We assume they are returned in the same order as on the original
    expect(Object.keys(clonedObj)).toEqual(['x', 'y', 'z']);
    expect(clonedObj.z).not.toBe(original.z);
  });

  // it('Clones class instance as it is', () => {
  //   const Y = class {
  //     c() {
  //       this.w = 'l';
  //     }
  //   };
  //
  //   const X = class extends Y {
  //     constructor(x) {
  //       super();
  //
  //       if (!x) {
  //         throw new Exception('NoNoNo!');
  //       }
  //       this.a = 'b';
  //     }
  //
  //     b() {
  //       this.c = 'd';
  //     }
  //   };
  //
  //   const Clone = clone(X);
  //   expect(Clone).not.toBe(X);
  // });
  //
  // it('Clones the class as it is', () => {
  //
  // });
  //
  // it('Clones inherited properties', () => {
  //
  // });
  //
  // it('Clones static properties', () => {
  //
  // });
});
