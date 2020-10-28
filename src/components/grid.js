import React, { Component } from "react";

export default class Grid extends Component {
	renderButtonsGrid = () => {
		const { grid } = this.props;
		var rowNum = 0;
		var renderGrid = grid.map((row) => {
			var colNum = 0;
			var boxRow = row.map((letter) => {
				return (
					<div key={`${rowNum} ${colNum++}`} className="grid-letter">
						{letter}
					</div>
				);
			});
			return (
				<div key={`${rowNum++}`} className="grid-row">
					{boxRow}
				</div>
			);
		});
		return <div className="grid-container">{renderGrid}</div>;
	};
	render() {
		return <div>{this.renderButtonsGrid()}</div>;
	}
}
