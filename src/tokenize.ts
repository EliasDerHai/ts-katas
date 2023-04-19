import { SearchResult } from "./search";
import { ArithmeticOperand, getOperand } from "./calc";

type NumberToken = {
    value: number;
    depth: number;
}

type OperandToken = {
    value: ArithmeticOperand;
    depth: number;
}

export type Token = NumberToken | OperandToken;

export function tokenize(matches: SearchResult): Token[] {
    return matches.numbers.reduce<Token[]>((acc, nextNumber) => {
        const nextOperand = matches.operands.shift();

        const nextOperandIndex = nextOperand?.index ?? Number.MAX_SAFE_INTEGER;
        const nextNumberIndex = nextNumber.index ?? Number.MAX_SAFE_INTEGER;

        const operandToken = nextOperand ? getOperandToken(matches, nextOperand) : null;
        const numberToken = getNumberToken(matches, nextNumber);

        if (nextNumberIndex === nextOperandIndex) {
            const invertedNumberToken = {value: numberToken.value * -1, depth: numberToken.depth}
            const apply = wasLastANumber(acc)
            ? operandToken ? [...acc, operandToken, invertedNumberToken] : [...acc, invertedNumberToken]
            : operandToken ? [...acc, invertedNumberToken, operandToken] : [...acc, invertedNumberToken];
            return [...acc, ...apply];

        } else if (nextNumberIndex < nextOperandIndex) {
            return operandToken ? [...acc, numberToken, operandToken] : [...acc, numberToken];

        } else {
            return operandToken ? [...acc, operandToken, numberToken] : [...acc, numberToken];
        }
    }, []);
}

function wasLastANumber(token: Token[]): boolean {
    return token.length === 0 || typeof token[token.length].value === 'number';
}

function countUntilToken(toCount: RegExpMatchArray[], until: RegExpMatchArray): number {
    return toCount.filter(countMatch => (countMatch.index ?? 0) < (until.index ?? 0)).length
}

function getOperandToken(matches: SearchResult, value: RegExpMatchArray): OperandToken {
    const depth = getDepth(matches, value)
    return { value: getOperand(value[0]), depth }
}

function getNumberToken(matches: SearchResult, value: RegExpMatchArray): NumberToken {
    const depth = getDepth(matches, value)
    return { value: Number(value[0]), depth }
}

function getDepth(matches: SearchResult, until: RegExpMatchArray): number {
    return countUntilToken(matches.openBrackets, until) - countUntilToken(matches.closeBrackets, until);
}