# `proxify-class` examples

This folder contains example usages of `proxify-class` and serves as a starting point for using the library in real situations.

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

## Logging

This example shows how each method invocation could be easily logged to any logger (in this case - the simplest one, `console.log`).

Each modifier returns untouched arguments list and logs them as they are.

What's more, as there is no signature given for modifier, it can work with any input
