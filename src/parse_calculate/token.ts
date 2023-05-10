import { ArithmeticOperand, getOperand } from "./arithmetic-operand";

/**
 * 
 * the higher the "depth", the earlier this token should be evaluated
 * +1.0 for each nesting = open bracket "("
 * +.5 for "*" and "/" (also adjacent) => dot operands have to be evaluated before "+" or "-" (non-stacking)
 */
export type Token = NumberToken | OperandToken;

export type NumberToken = {
    value: number;
    depth: number;
}

export type OperandToken = {
    value: ArithmeticOperand;
    depth: number;
}

export const isNumberToken = (token: any): token is NumberToken =>
    (typeof token?.value === 'number');

export const isOperandToken = (token: any): token is OperandToken =>
    (getOperand(token?.value, false) !== ArithmeticOperand.none);