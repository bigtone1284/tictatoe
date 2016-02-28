var Game = Backbone.Model.extend({
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