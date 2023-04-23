import { ArithmeticOperand } from "./arithmetic-operand";
import { Token, NumberToken, OperandToken, isNumberToken, isOperandToken } from "./token";

export function evaluate(token: Token[]): number {

    while (token.length > 1) {
        const maxDepth = Math.max(...token.map(t => t.depth));


        while (token.some(t => t.depth === maxDepth)) {
            let nextDeepest = token.find(t => t.depth === maxDepth);
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
                throw new Error('Token do not match their expectation (type)')
            }

            const expressionValue = evaluateSingleExpression(nextDeepest, otherNumber, operandToken);
            const highestAdjacentDepth = getHighestAdjacentDepth(token, nextDeepestIndex);
            const singleExpressionReplacementToken: NumberToken =
                { value: expressionValue, depth: highestAdjacentDepth };

            token.splice(nextDeepestIndex, 3, singleExpressionReplacementToken);
        }
    }

    // get maxDepth
    // find first 3 with max depth
    // evaluate 
    // set the new weight to the hightest adjacent token
    // continue with the next 3-piece chain of highest depth until no more heighest depth
    // repeat until only one token left

    const finalToken = token[0];
    if (!isNumberToken(finalToken)) {
        throw new Error('Expected final token to be a number token');
    }

    return finalToken.value;
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