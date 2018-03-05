'use babel';

import React from 'react';
import Calendar from '../home/Calendar';

export default class Home extends React.Component {
	render() {
		return (
			<div className='wrapper'>
				<Calendar currentId = {this.props.currentId} bookings = {this.props.bookings}/>
			</div>
		);
	}
}
