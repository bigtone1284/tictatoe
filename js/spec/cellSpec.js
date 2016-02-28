var Cell = require('../models/cell');
module.exports = describe('Cell', function () {
	'use strict';
	var cell;

	beforeEach(function () {
		cell = new Cell();
	});

	describe('initialize', function () {
		it('should set the initial cell value to 0', function () {
			expect(cell.get('value')).toBe(0);
		});
	});
	describe('setValue', function () {
		it('should set the value of a cell', function () {
			cell.setValue(1);
			expect(cell.getValue('value')).toBe(1);
		});
	});
	describe('getValue', function () {
		it('should return 0 if the cell has not been played yet', function () {
			expect(cell.getValue()).toBe(0);
		});
		it('should return the value of a cell', function () {
			cell.setValue(1);
			expect(cell.getValue()).toBe(cell.getValue('value'));
		});
	});
	describe('playable', function () {
		it('should return true if the cell has not been played (setValue)', function () {
			expect(cell.playable()).toBe(true);
		});
		it('should return false if the cell has been played (setValue)', function () {
			cell.setValue(-1);
			expect(cell.playable()).toBe(false);
		});
	});
});