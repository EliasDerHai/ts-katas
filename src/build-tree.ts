import { ArithmeticOperand } from "./arithmetic-operand";
import { Token } from "./token";


export interface ArithmeticNode {
    valueA: ArithmeticNode | number;
    valueB: ArithmeticNode | number;
    operand: ArithmeticOperand;
    evaluate: () => number
}

export class ArithmeticNodeImpl implements ArithmeticNode {
    constructor(
        public readonly valueA: ArithmeticNode | number,
        public readonly valueB: ArithmeticNode | number,
        public readonly operand: ArithmeticOperand,
    ) {
    }

    evaluate(): number {
        return -1;
    }
}

export function buildTree(tokens: Token[]): ArithmeticNode {
    if (tokens.length < 3 || tokens.length % 2 === 0) { // 1+1 (lenght 3) 1*4-2 (length 5)...
        throw new Error('Illegal Argument');
    }

    return buildTreeRecursively(tokens);
}

function buildTreeRecursively(tokens: Token[]): ArithmeticNode {
    const node = getNode(tokens);

    if (tokens.length === 0) {
        return node;
    }

    const nextOperand = tokens.shift()?.value as ArithmeticOperand;
    return new ArithmeticNodeImpl(node, buildTreeRecursively(tokens), nextOperand);
}

function getNode(tokens: Token[]): ArithmeticNode {
    const tokenA = tokens.shift();
    const tokenOperand = tokens.shift();
    const tokenB = tokens.shift();

    const valueA = tokenA?.value as number;
    const valueB = tokenB?.value as number;
    const operand = tokenOperand?.value as ArithmeticOperand;
    return new ArithmeticNodeImpl(valueA, valueB, operand);
}
