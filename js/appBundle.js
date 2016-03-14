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

	var StartModal = __webpack_require__(1);

	$(function () {
		'use strict';
		new StartModal();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var GameView = __webpack_require__(2),
		Game = __webpack_require__(9);

	module.exports = Backbone.View.extend({
		el: '#startModal',
		events: {
			'click #startBtn': 'startGame'
		},
		getPlayerInfo: function () {
			'use strict';
			// either use the players name input or a default 'Player 1' or '2'
			var player1 = document.getElementById('playerOneInput').value || 'Player 1',
				player2 = document.getElementById('playerTwoInput').value || 'Player 2';
			return {
				playerOneName: player1,
				playerTwoName: player2
			};
		},
		startGame: function () {
			var players = this.getPlayerInfo();
			this.$el.addClass('hidden');
			new GameView({
				model: new Game(players)
			});
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var GameboardView = __webpack_require__(3),
		ScoreboardView = __webpack_require__(5),
		EndGameView = __webpack_require__(6);

	module.exports = Backbone.View.extend({
		el: '#game',
		events: {
			'click .cell': 'playCell',
		},
		initialize: function () {
			'use strict';
			this.listenTo(this.model, 'change:winner', this.renderEndGame);
			this.listenTo(this.model, 'change:gameboard', this.renderNewBoard);
			this.render();
		},
		render: function () {
			'use strict';
			var gameboard = new GameboardView({model: this.model.get('gameboard')}),
				scoreboard = new ScoreboardView({model: this.model});
			this.$el.append(scoreboard.$el, gameboard.$el);
		},
		renderEndGame: function () {
			'use strict';
			if (this.model.get('winner')) {
				this.undelegateEvents();
				var endGame = new EndGameView({model: this.model});
				this.$el.append(endGame.$el);
			}
		},
		renderNewBoard: function () {
			'use strict';
			var gameboard = new GameboardView({model: this.model.get('gameboard')});
			this.$el.append(gameboard.$el);
			this.delegateEvents();
		},
		playCell: function (ev) {
			'use strict';
			this.model.playCell(parseInt(ev.target.dataset.cellnum, 10));
		}
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var CellView = __webpack_require__(4);

	module.exports = Backbone.View.extend({
		className: 'gameboard',
		initialize: function () {
			'use strict';
			this.template = Handlebars.compile($('#gameboardTemplate').html());
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
		// makes 3 rows each with three cells in them.
			var length = this.model.cells.length,
				gameboard = this.template(),
				rows = $(gameboard).filter('.row'),
				posArr = ['left', 'center', 'right'],
				row,
				posNum,
				pos,
				cellView,
				i;
			_.each(this.model.cells, function (cell, index) {
				row = Math.floor(index / 3);
				posNum = index % 3;
				pos = posArr[posNum];
				cellView = new CellView({
					model: cell,
					className: pos + ' cell',
					attributes: {
						'data-cellNum': index
					}
				});
				rows.eq(row).append(cellView.$el);
			});
			this.$el.append(rows);
		}
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Backbone.View.extend({
		initialize: function () {
			'use strict';
			this.listenTo(this.model, 'change:value', this.render);
			this.listenTo(this.model, 'change:winningCell', this.markWinner);
			this.render();
		},
		render: function() {
			'use strict';
			var value = this.model.getValue(),
				cellMark = '',
				player = '';
			if (value === 1) {
				player = 'playerOne';
				cellMark = '&#x2716';
			}
			if (value === -1) {
				player = 'playerTwo';
				cellMark = 'O';
			}
			// the appropiate mark and style for each player.
			this.$el.addClass(player);
			this.$el.html(cellMark);
		},
		markWinner: function () {
			'use strict';
			// the styling for a winning row/column/diagnol
			this.$el.addClass('winner');
		}
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Backbone.View.extend({
		className: 'textDisplay scoreboard',
		initialize: function () {
			'use strict';
			this.template = Handlebars.compile($('#scoreboardTemplate').html());
			this.listenTo(this.model, 'change:playerOneScore change:playerTwoScore change:draws', this.renderScore);
			this.render();
		},
		render: function () {
			'use strict';
			var renderedTemplate = this.template(this.model.toJSON());
			this.$el.html(renderedTemplate);
		},
		renderScore: function () {
			'use strict';
			// only re-renders the score amount, none of the other elements.  
			Object.keys(this.model.changed).forEach(function(changedElement) {
				var scoreDiv = document.getElementById(changedElement);
				scoreDiv.innerHTML = this.model.changed[changedElement];
			}.bind(this));
		}
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Gameboard = __webpack_require__(7);

	module.exports = Backbone.View.extend({
		className: 'textDisplay endgame',
		events: {
			'click #playAgainBtn': 'startNewGame'
		},
		initialize: function () {
			'use strict';
			this.template = Handlebars.compile($('#endGameTemplate').html());
			this.render();
		},
		render: function () {
			'use strict';
			var winnerValue = this.model.get('winner'),
				draw = 'Draw!',
				winnerStr = ' wins!',
				endGameStr,
				endGameObject,
				player;
			switch(winnerValue) {
				case 1:
					endGameStr = this.model.get('playerOneName') + winnerStr;
					player = 'playerOne';
					break;
				case 2:
					endGameStr = this.model.get('playerTwoName') + winnerStr;
					player = 'playerTwo';
					break;
				case 'draw':
					endGameStr = draw;
					break;
				default:
					break;
			}
			endGameObject = {
				result: endGameStr
			};
			var renderedTemplate = this.template(endGameObject);
			this.$el.addClass(player);
			this.$el.html(renderedTemplate);
		},
		startNewGame: function () {
			'use strict';
			// if you choose to play again, get a new gameboard,
			// set winner back to null
			// and return move count to 0.
			var gameboardModel = this.model.get('gameboard');
			this.model.set('gameboard', new Gameboard());
			gameboardModel.destroy();
			this.model.set('winner', null);
			this.model.set('moveCount', 0);
			this.remove();
		}
	});

/***/ },
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

/***/ }
/******/ ]);