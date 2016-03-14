/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Cell = __webpack_require__(8);

	module.exports = Backbone.Model.extend({
		initialize: function () {
			'use strict';
			this.cells = [];
			for (var i = 0; i < 9; i++) {
				this.cells.push(new Cell());
			}
		},
		playCell: function (cellNum, cellValue) {
			'use strict';
			// Cells will have their value set to 1 or -1 (player 1/player 2)
			var cell = this.cells[cellNum];
			if (cell.playable()) {
				cell.setValue(cellValue);
				return true;
			}
			return false;
		},
		checkSubSet: function (subset) {
			'use strict';
			var subsetValue = subset.reduce(function (prevValue, cell) {
				return prevValue + cell.getValue();
			}, 0);
			// A winning row/column/diagnol will have a summed value of 3 or -3
			if (Math.abs(subsetValue) === 3) {
				subset.forEach(function (cell) {
					cell.set('winningCell', true);
				});
				return true;
			} else {
				return false;
			}
		},
		checkRow: function (cellNum) {
			'use strict';
			var rowNum = 3 * Math.floor(cellNum / 3),
				row = this.cells.slice(rowNum, rowNum + 3);
			return (this.checkSubSet(row));
		},
		checkColumn: function (cellNum) {
			'use strict';
			var colNum = cellNum % 3,
				col = [
					this.cells[colNum],
					this.cells[colNum + 3],
					this.cells[colNum + 6]
				];
			return (this.checkSubSet(col));
		},
		checkDiagnols: function (cellNum) {
			'use strict';
			var seDiagnol,
				neDiagnol,
				seDiagnolCheck,
				neDiagnolCheck;
			if (cellNum % 2 === 1) {
				return false;
			} else {
				seDiagnol = [
					this.cells[0],
					this.cells[4],
					this.cells[8]
				];
				neDiagnol = [
					this.cells[2],
					this.cells[4],
					this.cells[6]
				];
				seDiagnolCheck = this.checkSubSet(seDiagnol);
				neDiagnolCheck = this.checkSubSet(neDiagnol);
				return neDiagnolCheck || seDiagnolCheck;
			}
		},
		checkCell: function (cellNum) {
			'use strict';
			return this.checkRow(cellNum) || this.checkColumn(cellNum) || this.checkDiagnols(cellNum);
		}
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Backbone.Model.extend({
		initialize: function () {
			'use strict';
			this.set('value', 0);
		},
		setValue: function (value) {
			'use strict';
			this.set('value', value);
		},
		getValue: function () {
			'use strict';
			return this.get('value');
		},
		playable: function () {
			'use strict';
			return this.getValue() === 0;
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Gameboard = __webpack_require__(7);

	module.exports = Backbone.Model.extend({
		initialize: function () {
			'use strict';
			this.set({
				gameboard: new Gameboard(),
				moveCount: 0,
				playerOneScore: 0,
				playerTwoScore: 0,
				draws: 0,
				winner: null
			});
		},
		incMoveCount: function () {
			'use strict';
			var moveCount = this.get('moveCount');
			this.set('moveCount', ++moveCount);
		},
		playCell: function (cellNum) {
			'use strict';
			var moveCount = this.get('moveCount'),
				playerValue;
	// if the movecount pre-move is even, it's players one move; else player 2.
			if (moveCount % 2 === 0) {
				playerValue = 1;
			} else {
				playerValue = -1;
			}
			if (this.get('gameboard').playCell(cellNum, playerValue)) {
				this.incMoveCount();
			}
			this.checkGameOver(cellNum);
		},
		checkGameOver: function (cellNum) {
			'use strict';
			var moveCount = this.get('moveCount'),
				gameboard = this.get('gameboard');
				// if checkCell returns true there is a winner
			if (gameboard.checkCell(cellNum)) {
				// if the move count is now odd, player one wins; else player two.  
				if (moveCount % 2 === 1) {
					this.set('playerOneScore', this.get('playerOneScore') + 1);
					this.set('winner', 1);
				} else {
					this.set('playerTwoScore', this.get('playerTwoScore') + 1);
					this.set('winner', 2);
				}
			} else {
				if (moveCount === 9) {
					this.set('draws', this.get('draws') + 1);
					this.set('winner', 'draw');
				}
			}
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Cell = __webpack_require__(8);
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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Cell = __webpack_require__(8),
		Gameboard = __webpack_require__(7);

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(9),
		Gameboard = __webpack_require__(7);

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

/***/ }
/******/ ]);