var ScoreboardView = Backbone.View.extend({
	className: 'textDisplay scoreboard',
	initialize: function () {
		'use strict';
		this.template = Handlebars.compile($('#scoreboardTemplate').html());
		this.listenTo(this.model, 'change:playerOneScore change:playerTwoScore change:draws', this.renderScore);
		this.render();
	},
	render: function () {
		'use strict';
		var renderedTemplate = this.template(this.model.toJSON());
		this.$el.html(renderedTemplate);
	},
	renderScore: function () {
		'use strict';
		Object.keys(this.model.changed).forEach(function(changedElement) {
			var scoreDiv = document.getElementById(changedElement);
			scoreDiv.innerHTML = this.model.changed[changedElement];
		}.bind(this));
	}
});