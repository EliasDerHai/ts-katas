import { ArithmeticOperand } from "./arithmetic-operand";
import { ArithmeticNodeImpl, buildTree } from "./build-tree";
import { Token } from "./token";

xdescribe("build-tree", function () {

    it("should build 1+2", () => {
        const token: Token[] = [
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 2, depth: 0 },
        ];
        const actual = buildTree(token);

        const expected = new ArithmeticNodeImpl(1, 2, ArithmeticOperand.plus);
        expect(actual).toEqual(expected);
    });

    xit("should build 1+2+3", () => {
        const token: Token[] = [
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 2, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 3, depth: 0 },
        ];
        const actual = buildTree(token);

        const expectedSub = new ArithmeticNodeImpl(1, 2, ArithmeticOperand.plus);
        const expected = new ArithmeticNodeImpl(expectedSub, 3, ArithmeticOperand.plus);
        expect(actual).toEqual(expected);
    });



});