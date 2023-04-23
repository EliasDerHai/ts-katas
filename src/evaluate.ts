import { ArithmeticOperand } from "./arithmetic-operand";
import { Token, NumberToken, OperandToken, isNumberToken, isOperandToken } from "./token";

/**
 * @param token list of token (only number and operand -
 * the nesting (brackets or times/devided-by) is represented by a depth for each token)
 * @returns number that the equation resolves to
 */
export function evaluate(token: Token[]): number {

    // check done condition
    if (token.length === 1) {
        const finalToken = token[0];
        if (!isNumberToken(finalToken)) {
            throw new Error('Expected final token to be a number token');
        }
        return finalToken.value;
    }

    // get max depth
    const maxDepth = Math.max(...token.map(t => t.depth));

    // get 3 token ( number operator number - eg. 1 + 2)
    const nextDeepest = token.find(t => t.depth === maxDepth);
    if (!nextDeepest) { throw new Error('not possible'); }
    const nextDeepestIndex = token.indexOf(nextDeepest);
    const operandToken = token[nextDeepestIndex + 1];
    const otherNumber = token[nextDeepestIndex + 2];

    if (operandToken.depth !== maxDepth || otherNumber.depth !== maxDepth) {
        throw new Error('Expected adjacent tokens to be of same depth');
    }

    if (!isNumberToken(nextDeepest)
        || !isOperandToken(operandToken)
        || !isNumberToken(otherNumber)
    ) {
        throw new Error('Token do not match their expectation (type)');
    }

    // evaluate the token & get the highest depth of a token adjacent to the expression (= 3 token)
    const expressionValue = evaluateSingleExpression(nextDeepest, otherNumber, operandToken);
    const highestAdjacentDepth = getHighestAdjacentDepth(token, nextDeepestIndex);
    const singleExpressionReplacementToken: NumberToken =
        { value: expressionValue, depth: highestAdjacentDepth };

    // replace the expression with the new resolved token
    const updatedToken = [...token.slice(0, nextDeepestIndex), singleExpressionReplacementToken, ...token.slice(nextDeepestIndex + 3),];

    // repeat recursively
    return evaluate(updatedToken);
}



function evaluateSingleExpression(
    tokenA: NumberToken,
    tokenB: NumberToken,
    operandToken: OperandToken
): number {

    const valueA = tokenA.value;
    const valueB = tokenB.value;
    const operand = operandToken.value;

    switch (operand) {

        case ArithmeticOperand.plus:
            return valueA + valueB;

        case ArithmeticOperand.times:
            return valueA * valueB;

        case ArithmeticOperand.minus:
            return valueA - valueB;

        case ArithmeticOperand.dividedBy:
            return valueA / valueB;

        default:
            throw new Error('Illegal state')
    }
}

function getHighestAdjacentDepth(token: Token[], startOfSingleExpression: number): number {
    const leftDepth = startOfSingleExpression - 1 >= 0
        ? token[startOfSingleExpression - 1]?.depth
        : 0;

    const rightDepth = startOfSingleExpression + 3 < token.length
        ? token[startOfSingleExpression + 3]?.depth
        : 0;

    return Math.max(leftDepth, rightDepth);
}