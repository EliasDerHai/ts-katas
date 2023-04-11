import { search } from "./search";


describe("search", function () {
    it("should search for all numbers", () => {
        const searched = search('1+2 + 3 + 4.59');
        if (searched.numbers === null) { throw new Error('numbers should not be null') }
        expect([...searched.numbers].map(x => Number(x[0]))).toStrictEqual([1, 2, 3, 4.59]);
    });

    it("should search for all operators", () => {
        const searched = search('1 + 1 *1/1 -1');
        if (searched.operands === null) { throw new Error('operands should not be null') }
        expect([...searched.operands].map(x => x[0])).toStrictEqual(['+', '*', '/', '-']);
    });

    it("should include operators that are part of negative numbers", () => {
        const searched = search('1 + -1 * -1');
        if (searched.operands === null) { throw new Error('operands should not be null') }
        expect([...searched.operands].map(x => x[0])).toStrictEqual(['+', '-', '*', '-']);
    });

    it("should search for all open brackets", () => {
        const searched = search('(((1 + 2)))');
        if (searched.openBrackets === null) { throw new Error('openBrackets should not be null') }
        expect([...searched.openBrackets].map(x => x[0])).toStrictEqual(['(', '(', '(']);
    });

    it("should search for all close brackets", () => {
        const searched = search('(((1 + 2)))');
        if (searched.closeBrackets === null) { throw new Error('closeBrackets should not be null') }
        expect([...searched.closeBrackets].map(x => x[0])).toStrictEqual([')', ')', ')']);
    });
});
