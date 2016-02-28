var GameboardView = require('./gameboard'),
	ScoreboardView = require('./scoreboard'),
	EndGameView = require('./endGame');

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