// ---------------------------------------- TO DO ----------------------------------------

'use babel';

import React from 'react';
import GridLayout from 'react-grid-layout';

function colorScheme(status){ //color table
	switch(status){
		case "CI":
			return "yellow";
			break;
		case "CO":
			return "green";
			break;
		case "NCI":
			return "red";
			break;		
		case "NCO":
			return "red";
			break;
		default:
			return "grey"
			break;		
	}
}

export default class Layout extends React.Component {
	render(){
		let {bookings_list, current} = this.props;
		return(
		<div>
			<div className = "center"><h2> Monday     Tuesday  Wednesday Thursday  Friday   Saturday   Sunday</h2></div>
			<GridLayout className="layout" cols={7} rowHeight={12} width={1000} isResizable = {false} verticalCompact = {false}>
				{
				current.map(obj => 
					<div className = {colorScheme(obj.Status)} key={obj.BookingID} data-grid={{x: obj.DateIn.getDay() - 1, y: obj.KennelID*1, w: (true && obj.Days*1) || 1, h: 2}}><b>{obj.AnimalName}/{obj.FirstName} {obj.LastName}</b></div>
				)
				}
			</GridLayout>
		</div>
		)
	}
}