# proxify-class
[![Build Status](https://travis-ci.org/SzybkiSasza/proxify-class.svg?branch=develop)](https://travis-ci.org/SzybkiSasza/proxify-class)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/686fbd2f8b274a6fba02c710b9d33561)](https://www.codacy.com/app/SzybkiSasza/proxify-class?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/proxify-class&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/686fbd2f8b274a6fba02c710b9d33561)](https://www.codacy.com/app/SzybkiSasza/proxify-class?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/proxify-class&amp;utm_campaign=Badge_Coverage)

Simple library to modify method arguments before calling real method implementation.

# Motivation

Library is a result of solving a problem of obtaining database objects by helpers, called in many different contexts.

Depending on the context, helper could be called with a DB entity or only Id of the entity.

In order to make sure that the helper always operated on the `Object` and not on the `String` and to not complicate helpers or the code, we came up with `ProxifyClass` idea.

`ProxifyClass` allowed for separating parameter modifications and method logic, so the methods can always obtain standardised arguments (in our case arguments were DB objects) and not worry about type or structure of the arguments - the arguments could contain the same data structures, thanks to proxifying.

# Browser support

The library works with up to 3 most recent versions of any major browser. NodeJS is supported as well (at least NodeJS 4.x is required);

If Proxy object is available, it uses `handler.apply()` part of the Proxy. Otherwise, simple wrapping is performed, using `function.apply`.

# Methods

Proxify exposes two methods:
  - `proxifyClass` for profixying all the class methods
  - `proxifyFunction` for proxifying single function

## `proxify(originalFunction, modifier) => Function`

Proxifying a single method is rather straightforward:

1. Pass the original function that should be proxified
2. Pass the modifier that has the same signature as the original function (will be called with exactly the same parameters).

Modifier function has to return all the processed parameters as an `Array` so they can be passed to an original function.

Modifier function should take a form of `modifier(...args) => Array`.

**Please note!** Modifying original arguments passed to a modifier function is an **extremely** bad practice (immutability for the win!). The recommended approach is to return new list of arguments after processing original ones.

## `proxifyClass(originalClass, modifier, decide, options) => Class|Object`

`ProxifyClass` allows for proxifying classes (not the class instances, though!). It allows for proxifying any keys existing on the class prototype, apart from the constructor (if you want to proxify contructor, please use `proxifyFunction` separately).

As only some of the methods might need to be proxified in specific cases, optional `decide` function can be passed to `proxifyClass` to statically choose which class methods should be modified, based on their names.

Under the hood, `proxifyClass` calls `proxifyFunction` for every class method that should be proxified.

Options support following parameters:

 - `passGenerator` - indicates that passed modifier is a modifier generator, taking `propertyName` as an only argument and returning  modifier. Useful for any interaction that needs property (method) name, e.g. logging

### Decider function - `decide(methodName) => Boolean`

Decider has a simple purpose - to determine which class methods should be proxified, based on their names. This function is ran statically once on initial proxifying. It should return `true` for every method that should be proxified and any `falsy` value for the ones that should be left untouched.

### Modifier function - `modifier(...args) => Array`

Modifier function takes all the original arguments of a proxified method, clones and modifies them and returns as an elements of the array, so the original method can be called with them.

## Support for Promises and async/await

The library supports modifiers that are asynchronous. Please note that returning asynchronous value from the modifier will automatically cause whole proxified function to return asynchronous value. The original implementation **HAS** to be aware of this fact (so it's developer responsibility to be aware whether returned values should or should not be asynchronous).

To sum up, following three cases make perfect sense:

- Synchronous modifier and synchronous original implementation - will produce synchronously returned variable
- Synchronous modifier and asynchronous original implementation - will always produce asynchronously returned variable (promise)
- Asynchronous modifier **AND** asynchronous original implementation - will always produce asynchronously returned variable (promise)

## Support for callbacks

As the callbacks are just a special functions passed as the last parameter of the function, their support is given (check the tests for an example). There are two scenarios for using callbacks:

- Modifying input arguments - modify arguments however you want and pass the callback as it is
- Modifying the callback (*This is an interesting case!*) - you can modify values **AFTER** they are processed in the original function. You just have to wrap the callback into another callback and perform any operation you want on returned values.

# Examples

For examples, please refer to `examples` directory and examples README.
