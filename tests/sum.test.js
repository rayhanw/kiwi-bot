/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable quotes */
const sum = require("./sum");

const numbers = [
	{
		a: 1,
		b: 2,
		c: 3
	},
	{
		a: 2,
		b: 2,
		c: 4
	}
];
test("adds a + b equals c", () => {
	expect(sum(1, 2)).toBe(3);
	expect(sum(2, 2)).toBe(4);
	numbers.forEach(testSuite => {
		const { a, b, c } = testSuite;
		expect(sum(a, b)).toBe(c);
	});
});
