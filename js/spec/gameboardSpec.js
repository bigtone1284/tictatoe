describe('Gameboard', function () {
	'use strict';
	var gameboard;
	beforeEach(function () {
		gameboard = new Gameboard();
	});
	describe('initialize', function () {
		it('should start the gameboard off with 9 elements in cells array', function () {
			expect(gameboard.cells.length).toBe(9);
		});
		it('should contain cells in its cells array', function () {
			expect(gameboard.cells[0] instanceof Cell).toBe(true);
		});
	});
});