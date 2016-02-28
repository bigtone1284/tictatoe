var Cell = require('../models/cell'),
	Gameboard = require('../models/gameboard');
module.exports = describe('Gameboard', function () {
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
	describe('playCell', function () {
		it('should set the value of a given cell', function () {
			gameboard.playCell(0, 1);
			expect(gameboard.cells[0].getValue()).toBe(1);
		});
		it('should only set the value of a playable cell', function () {
			gameboard.playCell(2, 1);
			gameboard.playCell(2, -1);
			expect(gameboard.cells[2].getValue()).toBe(1);
		});
	});
	describe('checkRow', function () {
		it('it should return true if cells have the same non-Zero value', function () {
			gameboard.playCell(3, 1);
			gameboard.playCell(4, 1);
			gameboard.playCell(5, 1);
			expect(gameboard.checkRow(5)).toBe(true);
		});
		it('should return false if cells do not have the same value', function () {
			gameboard.playCell(6, 1);
			gameboard.playCell(7, 1);
			gameboard.playCell(8, -1);
			expect(gameboard.checkRow(8)).toBe(false);
		});
	});
	describe('checkColumn', function () {
		it('should return true if cells have the same non-Zero value', function () {
			gameboard.playCell(1, -1);
			gameboard.playCell(4, -1);
			gameboard.playCell(7, -1);
			expect(gameboard.checkColumn(7)).toBe(true);
		});
		it('should return false if cells do not have the same value', function () {
			gameboard.playCell(2, -1);
			gameboard.playCell(8, 1);
			expect(gameboard.checkColumn(8)).toBe(false);
		});
	});
	describe('checkDiagnols', function () {
		it('should return true if the NW to SE diagnol cells all have same non-zero value', function () {
			gameboard.playCell(0, -1);
			gameboard.playCell(4, -1);
			gameboard.playCell(8, -1);
			expect(gameboard.checkDiagnols(8)).toBe(true);
		});
		it('should return true if the SW to NE diagnol cells all have same non-zero value', function () {
			gameboard.playCell(6, -1);
			gameboard.playCell(4, -1);
			gameboard.playCell(2, -1);
			expect(gameboard.checkDiagnols(2)).toBe(true);
		});
		it('should return false if diagnol does not match have all have same non-zero value', function () {
			gameboard.playCell(6, -1);
			gameboard.playCell(4, -1);
			expect(gameboard.checkDiagnols(4)).toBe(false);
		});
		it('should return false if checking an odd index numbered cell', function () {
			gameboard.playCell(6, -1);
			gameboard.playCell(4, -1);
			gameboard.playCell(5, -1);
			expect(gameboard.checkDiagnols(5)).toBe(false);
		});
	});
	describe('checkCell', function () {
		it('should return true if the cell makes Tic Tac Toe', function () {
			gameboard.playCell(0, 1);
			gameboard.playCell(2, -1);
			gameboard.playCell(3, 1);
			gameboard.playCell(4, -1);
			gameboard.playCell(6, 1);
			expect(gameboard.checkCell(6)).toBe(true);
		});
		it('should return false if the cell did not make Tic Tac Toe', function () {
			gameboard.playCell(0, 1);
			gameboard.playCell(2, -1);
			gameboard.playCell(1, 1);
			gameboard.playCell(3, -1);
			gameboard.playCell(5, 1);
			gameboard.playCell(4, -1);
			gameboard.playCell(6, 1);
			gameboard.playCell(7, -1);
			gameboard.playCell(8, 1);
			expect(gameboard.checkCell(8)).toBe(false);
		});
	});
});