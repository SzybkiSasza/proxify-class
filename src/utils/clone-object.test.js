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

  it('Clones the inherited class properties', () => {
    const Parent = class {
      constructor(input) {
        this.input = input;
      }
    };

    const A = class extends Parent {
      constructor(input) {
        super(input);
        this.constructedProp = 'A';
      }
      a() {
        return 'a';
      }
    };

    const B = clone(A);
    const b = new B('someInput');

    const first = b.a();
    A.prototype.a = () => {
      return 'b';
    };
    const second = b.a();

    expect(first).toEqual(second);
    expect(b.input).toEqual('someInput');
    expect(b.constructedProp).toEqual('A');
  });

  it('Clones deep inherited properties', () => {
    const Parent = class {
      someMethod() {
        this.someResult = 123;
      }
    };
    const A = class extends Parent {
      ownMethod() {
        this.prop = 456;
      }
    };

    const B = clone(A);
    const b = new B('someInput');

    const first = b.someMethod();
    Parent.prototype.someMethod = function() {
      this.someResult = 789;
    };
    const second = b.someMethod();

    expect(first).toEqual(second);
  });
});
