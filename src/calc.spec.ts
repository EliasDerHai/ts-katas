import { calc } from "./calc";

describe("calc", function () {
    it("should evaluate '1+1' correctly", () => {
        const actual = calc('1+1');
        const expected = 2;
        expect(actual).toBe(expected);
    });

    it("should evaluate '1 - 1' correctly", () => {
        const actual = calc('1 - 1');
        const expected = 0;
        expect(actual).toBe(expected);
    });

    it("should evaluate '1* 1' correctly", () => {
        const actual = calc('1* 1');
        const expected = 1;
        expect(actual).toBe(expected);
    });

    it("should evaluate '1 /1' correctly", () => {
        const actual = calc('1 /1');
        const expected = 1;
        expect(actual).toBe(expected);
    });

    it("should evaluate '-123' correctly", () => {
        const actual = calc('-123');
        const expected = -123;
        expect(actual).toBe(expected);
    });

    it("should evaluate '123' correctly", () => {
        const actual = calc('123');
        const expected = 123;
        expect(actual).toBe(expected);
    });

    it("should evaluate '2 /2+3 * 4.75- -6' correctly", () => {
        const actual = calc('2 /2+3 * 4.75- -6');
        const expected = 21.25;
        expect(actual).toBe(expected);
    });

    it("should evaluate '12* 123' correctly", () => {
        const actual = calc('12* 123');
        const expected = 1476;
        expect(actual).toBe(expected);
    });

    it("should evaluate '2 / (2 + 3) * 4.33 - -6' correctly", () => {
        const actual = calc('2 / (2 + 3) * 4.33 - -6');
        const expected = 7.732;
        expect(actual).toBe(expected);
    });
});
