'use babel';

import React from 'react';
import Notifications from '../home/Notifications';
import Alerts from '../home/Alerts';
import Calendar from '../home/Calendar';

export default class Home extends React.Component {
	constructor(props) {
    	super(props) 
    }



	render() {
		return (
			<div className="wrapper">
				<Calendar animal = {this.props.animal}/>
				<Alerts dogs = {this.props.dogs}/>
	      <Notifications dogs = {this.props.dogs} screen = {this.switch_screen}/> 
			</div>
		);
	}
}
