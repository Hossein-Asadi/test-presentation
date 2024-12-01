const Calculator = require('./part2');

describe("Calculator", () => {
    let calculator;

    beforeAll(() => {
        console.log("Starting Calculator Tests...");
    });

    afterAll(() => {
        console.log("Finished Calculator Tests...");
    });

    beforeEach(() => {
        calculator = new Calculator();
    });

    afterEach(() => {
        console.log("Test completed!");
    });

    describe("Addition", () => {
        test("adds two positive numbers", () => {
            expect(calculator.add(2, 3)).toBe(5);
        });

        test("adds a positive and a negative number", () => {
            expect(calculator.add(5, -3)).toBe(2);
        });
    });

    describe("Subtraction", () => {
        test("subtracts two numbers", () => {
            expect(calculator.subtract(10, 4)).toBe(6);
        });
    });

    describe("Multiplication", () => {
        test("multiplies two numbers", () => {
            expect(calculator.multiply(3, 4)).toBe(12);
        });
    });

    describe("Division", () => {
        test("divides two numbers", () => {
            expect(calculator.divide(8, 2)).toBe(4);
        });

        test("throws an error when dividing by zero", () => {
            expect(() => calculator.divide(5, 0)).toThrow("Cannot divide by zero");
        });
    });

    describe("History", () => {
        test("saves operations to history", () => {
            calculator.add(1, 2);
            calculator.subtract(5, 3);
            expect(calculator.getHistory().length).toBe(2);
        });

        test("clears history", () => {
            calculator.add(1, 2);
            calculator.clearHistory();
            expect(calculator.getHistory().length).toBe(0);
        });
    });
});

