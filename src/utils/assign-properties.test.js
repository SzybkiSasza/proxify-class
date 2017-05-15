/* eslint-disable require-jsdoc */

import getAllPropertyNames from './get-all-property-names';

describe('Get all property names', () => {
  it('Is a defined function', () => {
    expect(getAllPropertyNames).toBeInstanceOf(Function);
  });

  it('Gets all the properties of a plain object', () => {
    const obj = {
      a: 'z',
      b: 2,
      c: () => {},
    };

    const props = getAllPropertyNames(obj);
    expect(props).toEqual({
      propertyNames: ['a', 'b', 'c'],
      inheritedPropertyNames: false,
    });
  });

  it('Gets inherited properties from the class definition', () => {
    class X {
      a() {}
    };

    const x = new X();
    const props = getAllPropertyNames(x);
    expect(props).toEqual({
      propertyNames: [],
      inheritedPropertyNames: {
        propertyNames: ['constructor', 'a'],
        inheritedPropertyNames: false,
      },
    });
  });

  it('Gets the properties from the parent class of the class', () => {
    class A {
      a() {}
    };
    class B extends A {
      b() {}
    };

    const props = getAllPropertyNames(B.prototype);
    expect(props).toEqual({
      propertyNames: ['constructor', 'b'],
        inheritedPropertyNames: {
          propertyNames: ['constructor', 'a'],
          inheritedPropertyNames: false,
        },
      }
    );
  });

  it('Gets the properties for the instance of inherited class', () => {
    class X {
      a() {}
    };
    class Y extends X {
      b() {}
    };

    const z = new Y();
    const props = getAllPropertyNames(z);
    expect(props).toEqual({
      propertyNames: [],
      inheritedPropertyNames: {
        propertyNames: ['constructor', 'b'],
          inheritedPropertyNames: {
            propertyNames: ['constructor', 'a'],
            inheritedPropertyNames: false,
          },
        },
      }
    );
  });
});
