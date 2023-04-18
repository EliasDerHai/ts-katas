export type SearchResult = {
    numbers: RegExpMatchArray[],
    operands: RegExpMatchArray[],
    openBrackets: RegExpMatchArray[],
    closeBrackets: RegExpMatchArray[],
}

export function search(expression: string): SearchResult {
    const numberRegex = /-?\d+(\.\d+)?/g;
    const operandRegex = /[+*\/-]/g;
    // const numberRegex = /(?:-?(?<=\s*[+\-*/]\s*)|-?\d+(\.\d+)?)/g;
    // const operandRegex = /([+*\/]|(?<!(?:[-+*\/]\s*))-)/g;
    const openRegex = /\(/g;
    const closeRegex = /\)/g;
    expression = expression.trim();

    return {
        numbers: [...expression.matchAll(numberRegex)],
        operands: [...expression.matchAll(operandRegex)],
        openBrackets: [...expression.matchAll(openRegex)],
        closeBrackets: [...expression.matchAll(closeRegex)],
    };
}


