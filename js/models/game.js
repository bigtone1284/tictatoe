var Gameboard = require('./gameboard');

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