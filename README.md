# proxify-class
Simple library to change method arguments before calling real method.
If Proxy object is available, it uses `handler.apply()` method. Otherwise, simple wrapping is performed, using `function.apply`.

# Methods
Each `proxify()` could take two arguments - `decider` function that allows for deciding which methods should be proxified an when and `modifier` function which modifies original arguments before calling original method

## Decider function
Function has a following signature: // TODO

## Modifier function
Function has a following signature: // TODO

# Usage - example

## Proxifying the class/object
// TODO

## Proxifying a single method
// TODO
