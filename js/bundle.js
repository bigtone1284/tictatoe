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

	__webpack_require__(1);
	var StartModal = __webpack_require__(5);

	$(function () {
		'use strict';
		new StartModal();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n\tbackground: #9370DB;\n\ttext-align: center;\n\tfont-family: 'Arvo', serif;\n}\n.gameboard {\n\tfont-family: 'Varela Round', sans-serif;\n\tfont-size: 0;\n}\n.cell {\n\tcursor: pointer;\n\tdisplay: inline-block;\n\tfont-size: 150px;\n\theight: 150px;\n\tline-height: 110%;\n\tvertical-align: middle;\n\twidth: 150px;\n}\n.center,\n.left {\n\tborder-right: 5px solid #000;\n}\n.center,\n.right {\n\tborder-left: 5px solid #000;\n}\n.top .cell,\n.middle .cell {\n\tborder-bottom: 5px solid #000;\n}\n.bottom .cell,\n.middle .cell {\n\tborder-top: 5px solid #000;\n}\n.textDisplay {\n\tbackground: rgba(255, 255, 255, 0.5);\n\tborder: 3px solid rgba(255, 255, 255, 0.7);\n\tborder-radius: 10px;\n\tmargin: 0 auto;\n\tpadding: 10px 20px;\n\ttext-align: center;\n\twidth: 300px;\n}\n.scoreboard {\n\tfont-size: 24px;\n\tdisplay: table;\n\tmargin-bottom: 10px;\n\twidth: 450px;\n}\n.playerScore {\n\tdisplay: table-cell;\n}\n.endgame {\n\tbottom: 400px;\n\tfont-size: 48px;\n\tposition: relative;\n\tz-index: 10;\n}\n.playerInput {\n\tbackground: rgba(255, 255, 255, 0);\n\tborder: none;\n\tborder-bottom: 3px solid rgba(255, 255, 255, 0.7);\n\tdisplay: block;\n\tfont-size: 25px;\n\tmargin-bottom: 10px;\n\tpadding: 10px;\n\twidth: 275px;\n}\n::-webkit-input-placeholder {\n\tcolor: #708090;\n\tfont-family: 'Arvo', serif;\n}\n::-moz-placeholder {\n\tcolor: #708090;\n\tfont-family: 'Arvo', serif;\n}\ninput:focus {\n\toutline: none;\n}\n.btn {\n\tbackground: rgba(255, 255, 255, 0.7);\n\tborder: 3px solid rgba(255, 255, 255, 0.5);\n\tborder-radius: 10px;\n\tfont-size: 25px;\n\tpadding: 5px 10px;\n}\n.btn:hover {\n\tbackground: rgba(255, 255, 255, 0.4);\n\tcursor: pointer;\n}\n.btn:active {\n\tbackground: rgba(255, 255, 255, 0.1);\n}\n.hidden {\n\tdisplay: none;\n}\n.playerOne {\n\tcolor: #B22222;\n}\n.playerTwo {\n\tcolor: #2E8B57;\n}\n.winner {\n\tbackground: #F0E68C;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var GameView = __webpack_require__(6),
		Game = __webpack_require__(13);

	module.exports = Backbone.View.extend({
		el: '#startModal',
		events: {
			'click #startBtn': 'startGame'
		},
		getPlayerInfo: function () {
			'use strict';
			var player1 = document.getElementById('playerOneInput').value || 'Player 1',
				player2 = document.getElementById('playerTwoInput').value || 'Player 2';
			return {
				playerOneName: player1,
				playerOneScore: 0,
				playerTwoName: player2,
				playerTwoScore: 0,
				draws: 0,
				winner: null
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var GameboardView = __webpack_require__(7),
		ScoreboardView = __webpack_require__(9),
		EndGameView = __webpack_require__(10);

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
			this.$el.append(scoreboard.$el);
			this.$el.append(gameboard.$el);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var CellView = __webpack_require__(8);

	module.exports = Backbone.View.extend({
		className: 'gameboard',
		initialize: function () {
			'use strict';
			this.template = Handlebars.compile($('#gameboardTemplate').html());
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
			var length = this.model.cells.length,
				gameboard = this.template(),
				rows = $(gameboard).filter('.row'),
				row,
				posNum,
				pos,
				cell,
				i;
			for (i = 0; i < length; i++) {
				row = Math.floor(i / 3);
				posNum = (i + 3) % 3;
				switch (posNum) {
					case 0:
						pos = 'left';
						break;
					case 1:
						pos = 'center';
						break;
					case 2:
						pos = 'right';
						break;
					default:
						break;
				}
				cell = new CellView({
					model: this.model.cells[i],
					className: pos + ' cell',
					attributes: {
						'data-cellNum': i
					}
				});
				rows.eq(row).append(cell.$el);
			}
			this.$el.append(rows);
		}
	});

/***/ },
/* 8 */
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
			this.$el.addClass(player);
			this.$el.html(cellMark);
		},
		markWinner: function () {
			'use strict';
			this.$el.addClass('winner');
		}
	});

/***/ },
/* 9 */
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
			Object.keys(this.model.changed).forEach(function(changedElement) {
				var scoreDiv = document.getElementById(changedElement);
				scoreDiv.innerHTML = this.model.changed[changedElement];
			}.bind(this));
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Gameboard = __webpack_require__(11);

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
			var gameboardModel = this.model.get('gameboard');
			this.model.set('gameboard', new Gameboard());
			gameboardModel.destroy();
			this.model.set('winner', null);
			this.model.set('moveCount', 0);
			this.remove();
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Cell = __webpack_require__(12);

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
			var colNum = (cellNum + 3) % 3,
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
				],
				neDiagnol = [
					this.cells[2],
					this.cells[4],
					this.cells[6]
				],
				seDiagnolCheck = this.checkSubSet(seDiagnol),
				neDiagnolCheck = this.checkSubSet(neDiagnol);
				if (cellNum === 2 || cellNum === 6) {
					return neDiagnolCheck;
				}
				if (cellNum === 0 || cellNum === 8) {
					return seDiagnolCheck;
				}
				if (cellNum === 4) {
					return neDiagnolCheck || seDiagnolCheck;
				}
			}
		},
		checkCell: function (cellNum) {
			'use strict';
			return this.checkRow(cellNum) || this.checkColumn(cellNum) || this.checkDiagnols(cellNum);
		}
	});

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Gameboard = __webpack_require__(11);

	module.exports = Backbone.Model.extend({
		initialize: function () {
			'use strict';
			this.set('gameboard', new Gameboard());
			this.set('moveCount', 0);
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
			if ((moveCount + 2) % 2 === 0) {
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
			if (gameboard.checkCell(cellNum)) {
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