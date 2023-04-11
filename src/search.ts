export type SearchResult = {
    numbers: IterableIterator<RegExpMatchArray> | null,
    operands: IterableIterator<RegExpMatchArray> | null,
    openBrackets: IterableIterator<RegExpMatchArray> | null,
    closeBrackets: IterableIterator<RegExpMatchArray> | null,
}

export function search(expression: string): SearchResult {
    const numberRegex = /-?\d+(\.\d+)?/g; // This regex is also updated to match decimal numbers
    const operandRegex = /[+\-*/]/g;
    const openRegex = /\(/g;
    const closeRegex = /\)/g;
    expression = expression.trim();
    return {
        numbers: expression.matchAll(numberRegex),
        operands: expression.matchAll(operandRegex),
        openBrackets: expression.matchAll(openRegex),
        closeBrackets: expression.matchAll(closeRegex),
    }
}


