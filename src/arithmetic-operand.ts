
export enum ArithmeticOperand {
    none = 'none',
    plus = '+',
    minus = '-',
    times = '*',
    dividedBy = '/'
}

export function getOperand(char: string, throwOnMissMatch: boolean = true) {
    switch (char) {
        case '+':
            return ArithmeticOperand.plus;

        case '-':
            return ArithmeticOperand.minus;

        case '*':
            return ArithmeticOperand.times;

        case '/':
            return ArithmeticOperand.dividedBy;

        default:
            if (throwOnMissMatch) {
                throw new Error('Illegal Argument - not an operand ' + char)
            } else {
                return ArithmeticOperand.none;
            }
    }
}


