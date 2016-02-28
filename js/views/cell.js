var CellView = Backbone.View.extend({
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