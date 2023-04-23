import { ArithmeticOperand } from "./arithmetic-operand";
import { search } from "./search";
import { tokenize } from "./tokenize";


describe("tokenize - without brackets", function () {
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
            { value: -2, depth: 0.5 },
            { value: ArithmeticOperand.times, depth: 0.5 },
            { value: -1, depth: 0.5 },
        ]);
    });

    it("should tokenize 2/-1", () => {
        const searchResult = search('2/-1');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 2, depth: 0.5 },
            { value: ArithmeticOperand.dividedBy, depth: 0.5 },
            { value: -1, depth: 0.5 },
        ]);
    });

    it("should tokenize 22.5+-1.3*-444", () => {
        const searchResult = search('22.5+-1.3*-444');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 22.5, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: -1.3, depth: 0.5 },
            { value: ArithmeticOperand.times, depth: 0.5 },
            { value: -444, depth: 0.5 },
        ]);
    });

    it("should tokenize 22.5+-1.3  *-444", () => {
        const searchResult = search('22.5+ -1.3  *-444');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 22.5, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: -1.3, depth: 0.5 },
            { value: ArithmeticOperand.times, depth: 0.5 },
            { value: -444, depth: 0.5 },
        ]);
    });

});



describe("tokenize - with brackets", function () {
    it("should tokenize (1+2)", () => {
        const searchResult = search('(1 + 2)');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 1, depth: 1 },
            { value: ArithmeticOperand.plus, depth: 1 },
            { value: 2, depth: 1 }
        ]);
    });

    it("should tokenize 1 + (2-3)", () => {
        const searchResult = search('1 + (2-3)');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 1, depth: 0 },
            { value: ArithmeticOperand.plus, depth: 0 },
            { value: 2, depth: 1 },
            { value: ArithmeticOperand.minus, depth: 1 },
            { value: 3, depth: 1 }
        ]);
    });

    it("should tokenize (22.5+-1.3)*-444", () => {
        const searchResult = search('(22.5+-1.3)*-444');

        const actual = tokenize(searchResult);

        expect(actual).toEqual([
            { value: 22.5, depth: 1 },
            { value: ArithmeticOperand.plus, depth: 1 },
            { value: -1.3, depth: 1 },
            { value: ArithmeticOperand.times, depth: 0.5 },
            { value: -444, depth: 0.5 },
        ]);
    });

});