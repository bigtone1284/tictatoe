describe('Cell', function () {
	'use strict';
	var cell;

	beforeEach(function () {
		cell = new Cell();
	});

	describe('initialize', function () {
		it('should set the initial cell value to 0', function () {
			expect(cell.value).toBe(0);
		});
	});
	describe('setCell', function () {
		it('should set the value of a cell', function () {
			cell.setCell(1);
			expect(cell.value).toBe(1);
		});
	});
	describe('getCell', function () {
		it('should return "" if the cell has not been played yet', function () {
			expect(cell.getCell()).toBe(0);
		});
		it('should return the value of a cell', function () {
			cell.setCell(1);
			expect(cell.getCell()).toBe(cell.value);
		});
	});
	describe('playable', function () {
		it('should return true if the cell has not been played (setCell)', function () {
			expect(cell.playable()).toBe(true);
		});
		it('should return false if the cell has been played (setCell)', function () {
			cell.setCell(-1);
			expect(cell.playable()).toBe(false);
		});
	});
});