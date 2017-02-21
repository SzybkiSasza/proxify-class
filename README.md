# proxify-class
[![Build Status](https://travis-ci.org/SzybkiSasza/proxify-class.svg?branch=develop)](https://travis-ci.org/SzybkiSasza/proxify-class)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/686fbd2f8b274a6fba02c710b9d33561)](https://www.codacy.com/app/SzybkiSasza/proxify-class?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/proxify-class&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/686fbd2f8b274a6fba02c710b9d33561)](https://www.codacy.com/app/SzybkiSasza/proxify-class?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/proxify-class&amp;utm_campaign=Badge_Coverage)

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
