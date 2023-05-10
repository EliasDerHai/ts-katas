import { evaluate } from "./evaluate";
import { search } from "./search";
import { tokenize } from "./tokenize";


export function calc(expression: string): number {
    const matches = search(expression);
    const token = tokenize(matches);
    return evaluate(token);
}
