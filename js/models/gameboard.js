var Cell = require('./cell');

module.exports = Backbone.Model.extend({
	initialize: function () {
		'use strict';
		this.cells = [];
		for (var i = 0; i < 9; i++) {
			this.cells.push(new Cell());
		}
	},
	playCell: function (cellNum, cellValue) {
		'use strict';
		// Cells will have their value set to 1 or -1 (player 1/player 2)
		var cell = this.cells[cellNum];
		if (cell.playable()) {
			cell.setValue(cellValue);
			return true;
		}
		return false;
	},
	checkSubSet: function (subset) {
		'use strict';
		var subsetValue = subset.reduce(function (prevValue, cell) {
			return prevValue + cell.getValue();
		}, 0);
		// A winning row/column/diagnol will have a summed value of 3 or -3
		if (Math.abs(subsetValue) === 3) {
			subset.forEach(function (cell) {
				cell.set('winningCell', true);
			});
			return true;
		} else {
			return false;
		}
	},
	checkRow: function (cellNum) {
		'use strict';
		var rowNum = 3 * Math.floor(cellNum / 3),
			row = this.cells.slice(rowNum, rowNum + 3);
		return (this.checkSubSet(row));
	},
	checkColumn: function (cellNum) {
		'use strict';
		var colNum = cellNum % 3,
			col = [
				this.cells[colNum],
				this.cells[colNum + 3],
				this.cells[colNum + 6]
			];
		return (this.checkSubSet(col));
	},
	checkDiagnols: function (cellNum) {
		'use strict';
		var seDiagnol,
			neDiagnol,
			seDiagnolCheck,
			neDiagnolCheck;
		if (cellNum % 2 === 1) {
			return false;
		} else {
			seDiagnol = [
				this.cells[0],
				this.cells[4],
				this.cells[8]
			];
			neDiagnol = [
				this.cells[2],
				this.cells[4],
				this.cells[6]
			];
			seDiagnolCheck = this.checkSubSet(seDiagnol);
			neDiagnolCheck = this.checkSubSet(neDiagnol);
			if (cellNum === 2 || cellNum === 6) {
				return neDiagnolCheck;
			}
			if (cellNum === 0 || cellNum === 8) {
				return seDiagnolCheck;
			}
			if (cellNum === 4) {
				return neDiagnolCheck || seDiagnolCheck;
			}
		}
	},
	checkCell: function (cellNum) {
		'use strict';
		return this.checkRow(cellNum) || this.checkColumn(cellNum) || this.checkDiagnols(cellNum);
	}
});