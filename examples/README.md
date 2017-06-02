# `proxify-class` examples

This folder contains example usages of `proxify-class` and serves as a starting point for using the library in real situations.

Examples are mostly kept as simple as possible, only to underline some common concepts and problems that the library could solve.

## Example versions

Examples are divided into two versions - one written using `ES6` features and another ones using `ES5`.

Due to the differences between `class` implementations in the two standards, library exposes two versions.

It's recommended to run ES6 examples in NodeJS environment (`>= 4.x`).

Examples build for ES5 can be run in any browser environment supporting module loading (just load the example).

## Running

To run any example:

1. `npm i` or `yarn`
2. `npm run buildES5 && npm run build ES6`
3. Go to the particular example directory: `examples/esX/example-name`
4. Run the example:
  - NodeJS - run `node index`
  - Browser - copy `examples` and `lib` directories and include chosen example file using your module loader.

## Async DB (only for ES6)

This example shows how to enrich input arguments before calling method implementation when the enrichment is performed asynchronously.

Input that is passed to the method is always an object, thanks to modifier. The asynchronous nature of the method is preserved.

This example is present only for `ES6` version, as it would require adding a promise library for ES5 code.

## Logging

This example shows how each method invocation could be easily logged to any logger (in this case - the simplest one, `console.log`).

Each modifier returns untouched arguments list and logs them as they are.

What's more, as there is no signature given for modifier, it can work with any input

## Permissions

This example shows how to halt method invocation and throw an error for the invoker, if the invoker does not have permissions to run it.

Each modifier throws an error if the "user" points to the user that does not have permission to call this function.

## Result modification

An example taking results returned by the callback and modifying them to a standard format.

It modifies the results **after** they are asynchronously returned in the callback
