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
Library is a result of solving a problem when in one project some class methods obtained DB objects (`Object`) or IDs of the objects (`String`), depending on call scenario as the same argument. I wanted to separate DB object acquisition from the method call, so the methods themselves did not have to worry about argument type and to make it as transparent as possible. Hence, thanks to proxying, methods always obtained `Object`s (proxify obtained the objects, if the `String` was passed as the param).

## Proxifying the class/object
// TODO

## Proxifying a single method
// TODO
