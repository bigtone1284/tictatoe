var Game = require('../models/game'),
	Gameboard = require('../models/gameboard');
module.exports = describe('Game', function () {
	'use strict';
	var game;
	beforeEach(function () {
		game = new Game();
	});
	describe('initialize', function () {
		it('should start with a gameboard', function () {
			expect(game.get('gameboard') instanceof Gameboard).toBe(true);
		});
		it('should start with move count at 0', function () {
			expect(game.get('moveCount')).toBe(0);
		});
	});
	describe('incMoveCount', function () {
		it('should increase moveCount by 1', function () {
			game.incMoveCount();
			game.incMoveCount();
			expect(game.get('moveCount')).toBe(2);
		});
	});
	describe('playCell', function () {
		it('should set value of cell to 1 on odd turns', function () {
			game.playCell(1);
			expect(game.get('gameboard').cells[1].getValue()).toBe(1);
		});
		it('should set value of cell to -1 on even turns', function () {
			game.playCell(0);
			game.playCell(2);
			game.playCell(3);
			game.playCell(6);
			expect(game.get('gameboard').cells[6].getValue()).toBe(-1);
		});
	});
	describe('checkGameOver', function () {
		it('should return Player 1 if Player 1 wins', function () {
			game.playCell(0);
			game.playCell(2);
			game.playCell(3);
			game.playCell(4);
			game.playCell(6);
			expect(game.get('winner')).toBe(1);
		});
		it('should return Player 2 if Player 2 wins', function () {
			game.playCell(0);
			game.playCell(2);
			game.playCell(1);
			game.playCell(4);
			game.playCell(7);
			game.playCell(6);
			expect(game.get('winner')).toBe(2);
		});
		it('should return draw if no one wins and the board is full', function () {
			game.playCell(0);
			game.playCell(2);
			game.playCell(1);
			game.playCell(3);
			game.playCell(5);
			game.playCell(4);
			game.playCell(6);
			game.playCell(7);
			game.playCell(8);
			expect(game.get('winner')).toBe('draw');
		});
		it('should return null if the game is not over', function () {
			game.playCell(0);
			game.playCell(2);
			expect(game.get('winner')).toBe(null);
		});
	});
});