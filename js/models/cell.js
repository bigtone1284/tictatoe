Cell = Backbone.Model.extend({
	initialize: function () {
		'use strict';
		this.value = 0;
	},
	setCell: function (value) {
		'use strict';
		this.value = value;
	},
	getCell: function () {
		'use strict';
		return this.value;
	},
	playable: function () {
		'use strict';
		return this.getCell() === 0;
	}
});