import { ArithmeticOperand } from "./calc";
import { search } from "./search";
import { tokenize } from "./tokenize";


describe("tokenize", function () {
    it("should tokenize 1+2", () => {
        const searchResult = search('1 + 2');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 2, depth: 0 }
        ]);
    });

    it("should tokenize 1 + 2-3", () => {
        const searchResult = search('1 + 2-3');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 2, depth: 0 },
            { value: ArithmeticOperand.minus, depth: 0 },
            { value: 3, depth: 0 }
        ]);
    });

    it("should tokenize -2*-1", () => {
        const searchResult = search('-2*-1');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: -2, depth: 0 },
            { value: ArithmeticOperand.times, depth: 0 },
            { value: -1, depth: 0 },
        ]);
    });

});