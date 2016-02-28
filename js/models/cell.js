module.exports = Backbone.Model.extend({
	initialize: function () {
		'use strict';
		this.set('value', 0);
	},
	setValue: function (value) {
		'use strict';
		this.set('value', value);
	},
	getValue: function () {
		'use strict';
		return this.get('value');
	},
	playable: function () {
		'use strict';
		return this.getValue() === 0;
	}
});