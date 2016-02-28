var GameboardView = Backbone.View.extend({
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