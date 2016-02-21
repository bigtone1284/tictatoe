Gameboard = Backbone.Model.extend({
	initialize: function () {
		'use strict';
		this.cells = [];
		for (var i = 0; i < 9; i++) {
			this.cells.push(new Cell());
		}
	}
});