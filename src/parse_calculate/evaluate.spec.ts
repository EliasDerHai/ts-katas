import { ArithmeticOperand } from "./arithmetic-operand";
import { evaluate } from "./evaluate";
import { Token } from "./token";


describe("evaluate", function () {

    it("should evaluate 1+2", () => {
        const token: Token[] = [
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 2, depth: 0 },
        ];
        const actual = evaluate(token);

        expect(actual).toEqual(3);
    });

    it("should evaluate 1+3", () => {
        const token: Token[] = [
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 3, depth: 0 },
        ];
        const actual = evaluate(token);

        expect(actual).toEqual(4);
    });

    it("should evaluate 1+3-2", () => {
        const token: Token[] = [
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 3, depth: 0 },
            { value: ArithmeticOperand.minus, depth: 0 },
            { value: 2, depth: 0 },
        ];
        const actual = evaluate(token);

        expect(actual).toEqual(2);
    });

    it("should evaluate (1+3)/2", () => {
        const token: Token[] = [
            { value: 1, depth: 1 },
            { value: ArithmeticOperand.plus, depth: 1 },
            { value: 3, depth: 1 },
            { value: ArithmeticOperand.dividedBy, depth: 0.5 },
            { value: 2, depth: 0.5 },
        ];
        const actual = evaluate(token);

        expect(actual).toEqual(2);
    });

    it("should evaluate (1+3)/(2-1)", () => {
        const token: Token[] = [
            { value: 1, depth: 1 },
            { value: ArithmeticOperand.plus, depth: 1 },
            { value: 3, depth: 1 },
            { value: ArithmeticOperand.dividedBy, depth: 0.5 },
            { value: 2, depth: 1 },
            { value: ArithmeticOperand.minus, depth: 1 },
            { value: 1, depth: 1 },
        ];
        const actual = evaluate(token);

        expect(actual).toEqual(4);
    });
});

