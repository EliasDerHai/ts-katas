import { ArithmeticOperand, getOperand } from "./arithmetic-operand";
import { SearchResult } from "./search";
import { Token, OperandToken, NumberToken } from "./token";


export function tokenize(searchResult: SearchResult): Token[] {
    const grouped = groupByValue([...searchResult.numbers, ...searchResult.operands], 'index');

    const token = grouped.reduce<Token[]>((acc, nextMatchs) => {
        if (nextMatchs.length > 2 || nextMatchs.length < 1) {
            throw new Error('Illegal argument ' + nextMatchs.map(x => x[0]).join(','));
        }

        if (nextMatchs.length === 2) {
            return [...acc, ...getOverwritingToken(searchResult, nextMatchs, acc)];
        } else {
            const match = nextMatchs[0];
            const token = isOperandMatch(match)
                ? getOperandToken(searchResult, match)
                : getNumberToken(searchResult, match);
            return [...acc, token];
        }
    }, []);

    addOperatorWeight(token);

    return token;
}

function groupByValue<T>(array: T[], property: keyof T): T[][] {
    const grouped: T[][] = [];
    const sortedArray = array.sort((a, b) => a[property] < b[property] ? -1 : 1);

    for (const item of sortedArray) {
        const lastGroup = grouped[grouped.length - 1];

        if (lastGroup && lastGroup[0][property] === item[property]) {
            lastGroup.push(item);
        } else {
            grouped.push([item]);
        }
    }

    return grouped;
}


function getOverwritingToken(searchResult: SearchResult, matches: RegExpMatchArray[], token: Token[]): Token[] {
    if (isLastTokenANumber(token)) {
        const operandMatch = matches.find(m => isOperandMatch(m));
        const numberMatch = matches.find(m => !isOperandMatch(m));

        if (!operandMatch) { throw new Error('Illegal state'); }
        if (!numberMatch) { throw new Error('Illegal state'); }

        return [getOperandToken(searchResult, operandMatch), getNumberToken(searchResult, numberMatch, -1)];

    } else {
        const match = matches.find(m => !isOperandMatch(m));

        if (!match) { throw new Error('Illegal state'); }

        return [getNumberToken(searchResult, match)];
    }
}

function isOperandMatch(match: RegExpMatchArray): boolean {
    return getOperand(match[0], false) !== ArithmeticOperand.none;
}

function isLastTokenANumber(token: Token[]): boolean {
    return token.length > 0 && typeof token[token.length - 1].value === 'number';
}

function countUntilToken(toCount: RegExpMatchArray[], until: RegExpMatchArray): number {
    return toCount.filter(countMatch => (countMatch.index ?? 0) < (until.index ?? 0)).length
}

function getOperandToken(matches: SearchResult, value: RegExpMatchArray): OperandToken {
    const depth = getDepth(matches, value)
    return { value: getOperand(value[0]), depth }
}

function getNumberToken(matches: SearchResult, regExpMatchArray: RegExpMatchArray, valueMultiplier = 1): NumberToken {
    const depth = getDepth(matches, regExpMatchArray);
    const value = Number(regExpMatchArray[0]) * valueMultiplier;
    return { value, depth }
}

function getDepth(matches: SearchResult, until: RegExpMatchArray): number {
    return countUntilToken(matches.openBrackets, until) - countUntilToken(matches.closeBrackets, until);
}

function addOperatorWeight(token: Token[]) {
    for (let i = 0; i < token.length; i++) {
        const pre = (i - 1) >= 0 ? token[i - 1] : null;
        const post = (i + 1) < token.length ? token[i + 1] : null;
        const curr = token[i];

        if ((hasSameDepth(pre, curr) && isDotOperand(pre))
            || (hasSameDepth(post, curr) && isDotOperand(post))) {
            curr.depth += .5;
        }
    }
}
function hasSameDepth(pre: Token | null, curr: Token): boolean {
    return pre?.depth === curr.depth;
}

function isDotOperand(pre: Token | null): boolean {
    return pre?.value === ArithmeticOperand.times || pre?.value === ArithmeticOperand.dividedBy
}

