// calculator.js
class Calculator {
    constructor() {
        this.history = [];
    }

    add(a, b) {
        const result = a + b;
        this.history.push({ operation: "add", operands: [a, b], result });
        return result;
    }

    subtract(a, b) {
        const result = a - b;
        this.history.push({ operation: "subtract", operands: [a, b], result });
        return result;
    }

    multiply(a, b) {
        const result = a * b;
        this.history.push({ operation: "multiply", operands: [a, b], result });
        return result;
    }

    divide(a, b) {
        if (b === 0) throw new Error("Cannot divide by zero");
        const result = a / b;
        this.history.push({ operation: "divide", operands: [a, b], result });
        return result;
    }

    clearHistory() {
        this.history = [];
    }

    getHistory() {
        return this.history;
    }
}

module.exports = Calculator;
