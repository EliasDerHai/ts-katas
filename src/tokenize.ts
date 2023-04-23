import { ArithmeticOperand, getOperand } from "./arithmetic-operand";
import { SearchResult } from "./search";
import { Token, OperandToken, NumberToken } from "./token";


export function tokenize(searchResult: SearchResult): Token[] {
    const grouped = groupByValue([...searchResult.numbers, ...searchResult.operands], 'index');

    let artificialDepth = 0;

    const token = grouped.reduce<Token[]>((acc, nextMatches, iteration) => {
        if (nextMatches.length > 2 || nextMatches.length < 1) {
            throw new Error('Illegal argument ' + nextMatches.map(x => x[0]).join(','));
        }

        if (nextMatches.length === 2) {
            return [...acc, ...getOverwritingToken(searchResult, nextMatches, acc, artificialDepth)];
        } else {
            const expectOperand = iteration % 2 === 1;
            const match = nextMatches[0];

            // handling "-(" by adding "-1" "*" with side effect artificialDepth (ugly)
            if (!expectOperand
                && match[0] === '-'
                && searchResult.openBrackets.some(m => m.index === (match.index ?? -1) + 1)
            ) {
                const depth = getDepth(searchResult, match) + 1;
                artificialDepth++;
                return [
                    ...acc,
                    { value: -1, depth },
                    { value: ArithmeticOperand.times, depth }
                ];
            }

            const token = isOperandMatch(match)
                ? getOperandToken(searchResult, match)
                : getNumberToken(searchResult, match);

            token.depth += artificialDepth;
            return [...acc, token];
        }
    }, []);

    addOperatorWeight(token);

    return token;
}

function groupByValue<T>(array: T[], property: keyof T): T[][] {
    const sortedArray = array.sort((a, b) => a[property] < b[property] ? -1 : 1);

    return sortedArray.reduce<T[][]>((groups, item) => {
        const lastGroup = groups[groups.length - 1];

        if (lastGroup && lastGroup[0][property] === item[property]) {
            return [...groups.slice(0, groups.length - 1), [...lastGroup, item],
            ];
        } else {
            return [...groups, [item]];
        }
    }, []);
}

function getOverwritingToken(
    searchResult: SearchResult,
    matches: RegExpMatchArray[],
    token: Token[],
    artificialDepth: number
): Token[] {

    if (isLastTokenANumber(token)) {
        const operandMatch = matches.find(m => isOperandMatch(m));
        const numberMatch = matches.find(m => !isOperandMatch(m));

        if (!operandMatch) { throw new Error('Illegal state'); }
        if (!numberMatch) { throw new Error('Illegal state'); }

        const token = [getOperandToken(searchResult, operandMatch), getNumberToken(searchResult, numberMatch, -1)];
        token.forEach(t => t.depth += artificialDepth);
        return token;
    } else {
        const match = matches.find(m => !isOperandMatch(m));

        if (!match) { throw new Error('Illegal state'); }

        const token = [getNumberToken(searchResult, match)];
        token.forEach(t => t.depth += artificialDepth);
        return token;
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
    token.filter((current, tokenIndex) => {
        const previous = (tokenIndex - 1) >= 0
            ? token[tokenIndex - 1]
            : null;
        const next = (tokenIndex + 1) < token.length
            ? token[tokenIndex + 1]
            : null;

        return (hasSameDepth(previous, current) && isDotOperand(previous))
            || (hasSameDepth(next, current) && isDotOperand(next))
            || isDotOperand(current)
    }).forEach(filteredToken => filteredToken.depth += .5);
}

function hasSameDepth(other: Token | null, curr: Token): boolean {
    return other?.depth === curr.depth;
}

function isDotOperand(token: Token | null): boolean {
    return token?.value === ArithmeticOperand.times || token?.value === ArithmeticOperand.dividedBy
}

