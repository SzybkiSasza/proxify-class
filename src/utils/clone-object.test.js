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

  it('Clones the Class definition', () => {
    // Old - style class def, to check compatibility
    const A = function() {
      this.prop = 'propVal';
    };
    A.prototype.setA = function() {
      this.a = 'a';
    };

    const B = clone(A);
    expect(B).not.toBe(A);
    expect(B.prototype.setA).not.toBe(A.prototype.setA);
  });

  it('Allows for instantiating cloned class', () => {
    const X = class {
      constructor() {
        this.constructedProp = 'val1';
      }
      b() {
        this.assignedProp = 'val2';
      }
    };

    const Y = clone(X);
    const y = new Y();
    y.b();

    expect(y.constructedProp).toEqual('val1');
    expect(y.assignedProp).toEqual('val2');
  });
});
