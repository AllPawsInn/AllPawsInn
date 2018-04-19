// ---------------------------------------- TO DO ----------------------------------------

'use babel';

import React from 'react';
import GridLayout from 'react-grid-layout';

export default class Layout extends React.Component {
	render(){
		let {bookings_list, current} = this.props;
		return(
		<div>
			<div className = "center"><h2>    Monday     Tuesday   Wednesday   Thursday     Friday      Saturday      Sunday</h2></div>
			<GridLayout className="layout" cols={7} rowHeight={12} width={1000} isResizable = {false} verticalCompact = {false}>
				{
				current.map(obj => 
					<div className = {"yellow"} key="d" data-grid={{x: 3, y: 0, w: 1, h: 2}}><b>{bookings_list[1200].AnimalName}/{bookings_list[1200].FirstName} {bookings_list[1200].LastName}</b></div>
				)
				}
				<div className = "yellow" key="d" data-grid={{x: 3, y: 0, w: 1, h: 2}}><b>{bookings_list[1200].AnimalName}/{bookings_list[1200].FirstName} {bookings_list[1200].LastName}</b></div>
				<div className = "green" key="e" data-grid={{x: 4, y: 0, w: 1, h: 2}}><b>{bookings_list[1201].AnimalName}/{bookings_list[1201].FirstName} {bookings_list[1201].LastName}</b></div>
				<div className = "yellow" key="4" data-grid={{x: 4, y: 1, w: 1, h: 2}}><b>{bookings_list[1204].AnimalName}/{bookings_list[1204].FirstName} {bookings_list[1204].LastName}</b></div>
				<div className = "green" key="6" data-grid={{x: 6, y: 1, w: 1, h: 2}}><b>{bookings_list[1202].AnimalName}/{bookings_list[1202].FirstName} {bookings_list[1202].LastName}</b></div>
				<div className = "green" key="13" data-grid={{x: 6, y: 2, w: 1, h: 2}}><b>{bookings_list[1207].AnimalName}/{bookings_list[1207].FirstName} {bookings_list[1207].LastName}</b></div>
			</GridLayout>
		</div>
		)
	}
}