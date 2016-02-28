var EndGameView = Backbone.View.extend({
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