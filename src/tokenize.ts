import { SearchResult } from "./search";
import { ArithmeticOperand, getOperand } from "./calc";

export type Token = {
    value: number | ArithmeticOperand;
    depth: number;
}

export function tokenize(matches: SearchResult): Token[] {
    return matches.numbers.reduce<Token[]>((acc, nextNumber) => {
        const nextOperand = matches.operands.shift();
        const nextOperandIndex = nextOperand?.index ?? Number.MAX_SAFE_INTEGER;
        const nextNumberIndex = nextNumber.index ?? Number.MAX_SAFE_INTEGER;
        const numberDepth = getDepth(matches, nextNumber);
        const operandDepth = nextOperand ? getDepth(matches, nextOperand) : 0;

        const operandToken = nextOperand ? getOperandToken(nextOperand, operandDepth) : null;
        const numberToken = getNumberToken(nextNumber, numberDepth);

        if (nextNumberIndex === nextOperandIndex) {
            // check if last token was a number or an operand
            // put the opposite of what came last first
            return []

        } else if (nextNumberIndex < nextOperandIndex) {
            return operandToken ? [...acc, numberToken, operandToken] : [...acc, numberToken];

        } else {
            return operandToken ? [...acc, operandToken, numberToken] : [...acc, numberToken];
        }
    }, []);
}

function countUntilToken(toCount: RegExpMatchArray[], until: RegExpMatchArray): number {
    return toCount.filter(countMatch => (countMatch.index ?? 0) < (until.index ?? 0)).length
}

function getOperandToken(value: RegExpMatchArray, depth: number): Token {
    return { value: getOperand(value[0]), depth }
}

function getNumberToken(value: RegExpMatchArray, depth: number): Token {
    return { value: Number(value[0]), depth }
}

function getDepth(matches: SearchResult, until: RegExpMatchArray): number {
    return countUntilToken(matches.openBrackets, until) - countUntilToken(matches.closeBrackets, until);
}