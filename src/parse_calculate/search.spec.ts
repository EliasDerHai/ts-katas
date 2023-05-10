import { search } from "./search";


describe("search", function () {
    it("should search for all numbers", () => {
        const searched = search('1+2 + 3 + 4.59');
        expect(searched.numbers.map(x => Number(x[0]))).toStrictEqual([1, 2, 3, 4.59]);
    });

    it("should search for all operators", () => {
        const searched = search('1 + 1 *1/1 -1');
        expect(searched.operands.map(x => x[0])).toStrictEqual(['+', '*', '/', '-']);
    });

    it("should not include operators that are part of negative numbers", () => {
        const searched = search('1 +-1 * -1');
        expect(searched.operands.map(x => x[0])).toStrictEqual(['+', '-', '*', '-']);
    });

    it("should search for all open brackets", () => {
        const searched = search('(((1 + 2)))');
        expect(searched.openBrackets.map(x => x[0])).toStrictEqual(['(', '(', '(']);
    });

    it("should search for all close brackets", () => {
        const searched = search('(((1 + 2)))');
        expect(searched.closeBrackets.map(x => x[0])).toStrictEqual([')', ')', ')']);
    });
});
