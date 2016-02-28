var StartModal = Backbone.View.extend({
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