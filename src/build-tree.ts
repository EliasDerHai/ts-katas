import { ArithmeticOperand } from "./calc";
import { Token } from "./tokenize";


export type ArithmeticNode = {
    valueA: ArithmeticNode | number;
    valueB: ArithmeticNode | number | null;
    operand: ArithmeticOperand;
}

export function buildTree(tokens: Token[]): ArithmeticNode {

    return {
        valueA: 0,
        valueB: 0,
        operand: ArithmeticOperand.none
    }
}