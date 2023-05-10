# Challenge
https://www.codewars.com/kata/52a78825cdfc2cfc87000005

# Note
the initial tests where pretty simple compared to the ones of the "submit"-tests on codewars:
these include an arbitrary nesting ((((5))* -2)) or inverted nestings -(8*5) or ((-3 * -(-(-6))))
which were not expect when designing the algorithm

the tokenization has a hack to resolve "-(" to "-1" "*" and increasing the depth (this is not clean)
possibly this could be replaced by a stack to track the currently elevated scope or by replacing certain token in the inputstring upfront ... 

# Codewars Instructions

Given a mathematical expression as a string you must return the result as a number.
Numbers

Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.
Operators

You need to support the following mathematical operators:

    Multiplication *
    Division / (as floating point division)
    Addition +
    Subtraction -

Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.
Parentheses

You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6
Whitespace

There may or may not be whitespace between numbers and operators.

An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e all of the following are valid expressions.

1-1    // 0
1 -1   // 0
1- 1   // 0
1 - 1  // 0
1- -1  // 2
1 - -1 // 2
1--1   // 2

6 + -(4)   // 2
6 + -( -4) // 10

And the following are invalid expressions

1 - - 1    // Invalid
1- - 1     // Invalid
6 + - (4)  // Invalid
6 + -(- 4) // Invalid
