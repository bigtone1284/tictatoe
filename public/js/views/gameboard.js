var CellView = require('./cell');

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