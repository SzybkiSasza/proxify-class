/* eslint-disable require-jsdoc, no-invalid-this */

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

  it('By default clones every property', () => {
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
    original.x = 123;

    expect(clonedObj.x).toEqual(1);
  });

  it('Uses customizer for cloning function properties, if passed', () => {
    const original = {
      x: 1,
      y: (val) => val + 2,
    };

    // Creates a function that will run original with value + 1
    const customizer = (original) => (val) => original(val + 1);

    const clonedObj = clone(original, customizer);

    const originalResult = original.y(1);
    const clonedResult = clonedObj.y(1);

    expect(originalResult).toEqual(3);
    expect(clonedResult).toEqual(4);
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

  it('Clones static properties as well', () => {
    const A = class {
      static someMethod() {
        return 123;
      }
    };

    const B = clone(A);
    const first = B.someMethod();
    A.someMethod = function() {
      return 456;
    };
    const second = B.someMethod();

    expect(first).toEqual(second);
  });

  it('Uses customizer for cloning class methods, if passed', () => {
    const Original = function() {
      this.prop = 'val';
    };
    Original.prototype.method = function(variable) {
      this.prop2 = variable + 1;
      return this.prop2;
    };

    // Creates a function that will run original with value + 2
    // Returns a bound function!
    const customizer = (originalFunction) => function(variable) {
      return originalFunction.bind(this)(variable + 2);
    };

    const ClonedClass = clone(Original, customizer);
    const clonedObject = new ClonedClass();

    const result = clonedObject.method(4); // 4 + 2 + 1 = 7
    expect(result).toEqual(7);
    expect(clonedObject.prop2).toEqual(7);
  });
});
