import { SearchResult } from "./search";
import { ArithmeticOperand } from "./calc";

export type Token = {
    value: number | ArithmeticOperand;
    depth: number;
}

export function tokenize(matches: SearchResult): Token[] {



    return [];
}
