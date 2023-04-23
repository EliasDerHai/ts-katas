import { ArithmeticOperand, getOperand } from "./arithmetic-operand";

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
    (getOperand(token?.value) !== ArithmeticOperand.none);