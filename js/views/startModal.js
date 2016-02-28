var GameView = require('./game'),
	Game = require('../models/game');

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