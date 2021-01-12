const operation = require('./01_example');

describe("multiplication", function () {
    it("should multiply 2 and 3", function () {
        const product = operation(2, 3);
        expect(product).toBe(6);
    });
});
