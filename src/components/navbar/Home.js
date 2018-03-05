'use babel';

import React from 'react';
import Notifications from '../home/Notifications';
import Alerts from '../home/Alerts';
import Calendar from '../home/Calendar';

export default class Home extends React.Component {
	render() {
		return (
			<div className='wrapper'>
				<Calendar currentId = {this.props.currentId} bookings = {this.props.bookings}/>
				<Alerts dogs = {this.props.dogs}/>
				<Notifications dogs = {this.props.dogs} screen = {this.switch_screen}/> 
			</div>
		);
	}
}
