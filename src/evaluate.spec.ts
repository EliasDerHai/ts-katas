import { ArithmeticOperand } from "./arithmetic-operand";
import { evaluate } from "./evaluate";
import { Token } from "./token";


describe("build-tree", function () {

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
});

