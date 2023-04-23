import { ArithmeticOperand } from "./arithmetic-operand";
import { buildTree } from "./build-tree";
import { search } from "./search";
import { Token } from "./token";
import { tokenize } from "./tokenize";


export function calc(expression: string): number {
    const matches = search(expression);
    const tokens = tokenize(matches);

    if (tokens.length === 1) {
        return getNumerOrThrow(tokens[0]);
    }


    return -1;
}

function getNumerOrThrow(arg0: Token): number {
    if (typeof arg0.value != 'number') {
        throw new Error("Function not implemented.");
    }

    return arg0.value;
}
