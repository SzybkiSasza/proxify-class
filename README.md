# proxify-class
[![Build Status](https://travis-ci.org/SzybkiSasza/proxify-class.svg?branch=develop)](https://travis-ci.org/SzybkiSasza/proxify-class)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/686fbd2f8b274a6fba02c710b9d33561)](https://www.codacy.com/app/SzybkiSasza/proxify-class?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/proxify-class&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/686fbd2f8b274a6fba02c710b9d33561)](https://www.codacy.com/app/SzybkiSasza/proxify-class?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/proxify-class&amp;utm_campaign=Badge_Coverage)

Simple library to modify method arguments before calling real method implementation.

# Motivation

Library is a result of solving a problem of obtaining database objects by helpers, called in many different contexts.

Depending on the context, helper could be called with a DB entity or only id of the entity. In order to make sure that the helper always operates on the `Object` and not on the `String` and not complicate helpers signature or code, we came up with `ProxifyClass` idea.

`ProxifyClass` allowed for separating parameter modifications and method logic, so the methods can always obtain standardised arguments (in our case arguments were DB objects) and not worry about type or structure of the argument - the argument can contain the same data, thanks to proxifying.

# Browser support

The library works with up to 3 most recent versions of any major browser.

If Proxy object is available, it uses `handler.apply()` method. Otherwise, simple wrapping is performed, using `function.apply`.

# Methods

Proxify exposes two methods:
  - `proxifyClass` for profixying all the class methods
  - `proxifyFunction` for proxifying single function

## Proxifying a single method

Proxifying a single method is rather straightforward. All that has to be done is to pass a modifier function that has the same signature as the original function (will be called with exactly the same parameters). Modifier function has to return all the processed parameters as an array so they can be passed to an original function.

Modifier function should take a form of `modifier(...args) => Array`.

*Please note!* Modifying original arguments passed to a modifier function is a bad practice (immutability for the win!). The recommended approach is to return new list of arguments after processing original ones.

## Proxifying the class/object

`ProxifyClass` allows for proxifying class prototypes as well. It allows for proxifying any keys existing on the class prototype, apart from the constructor (if you want to proxify contructor, please use `proxifyFunction` separately).

As only some of the methods might need to be proxified in specific cases, optional `decide` function can be passed to `proxifyClass` to statically choose which class methods should be modified, based on their names.

Under the hood, `proxifyClass` calls `proxifyFunction` for every class method that should be proxified.

### Decider function - `decide(methodName) => Boolean`

Decider has a simple purpose - to determine which class methods should be proxified, based on their names. This function is ran statically once on initial proxifying. It should return `true` for every method that should be proxified and any `falsy` value for the ones that should be left untouched.

### Modifier function - `modifier(...args) => Array`

Modifier function takes all the original arguments of a proxified method, clones and modifies them and returns as an elements of the array, so the original method can be called with them.
