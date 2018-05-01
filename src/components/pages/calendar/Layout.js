// ---------------------------------------- TO DO ----------------------------------------

'use babel';

import React from 'react';
import GridLayout from 'react-grid-layout';

const oneDay = 24*60*60*1000;

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

function cellObject(range, obj){ //double check the logic here
	let dateOut = obj.DateOut
	let dateIn = obj.DateIn

	let new_obj = {
		h : 1,
		y : obj.KennelID * 1
	}

	if (range.sun > dateOut){
		if (dateIn > range.mon){ //between dateIn dateOut
			new_obj.x =  valueSundays(dateIn.getDay() - 1)
			new_obj.w = (Math.ceil((dateOut-dateIn)/oneDay)) || 1
		}
		else{										//between range.mon dateOut
			new_obj.x = 0
			new_obj.w = (Math.ceil((dateOut-range.mon)/oneDay)) || 1
		}
	}	
	else{
		if (dateIn > range.mon){ //between dateIn range.sun
			new_obj.x = valueSundays(dateIn.getDay() - 1)
			new_obj.w = (Math.ceil((range.sun-dateIn)/oneDay)) || 1
		}
		else{									//between range.mon range.sun
			new_obj.x = 0
			new_obj.w = (Math.ceil((range.sun-range.mon)/oneDay)) || 1
		}
	}
	return new_obj
}

function valueSundays(val){
	//can fix this more elegantly at some point
	//firstDay function returns value -1 for sundays since day.getDay() sunday is 0
	//val == -1 || 6 ...
	if (val === -1)
		return 6
	else
		return val

}

export default class Layout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			range : this.props.range,
			current : this.props.current
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			range : nextProps.range,
			current : nextProps.current
		})
	}

	onDragStop(e, element){
		console.log(e)
	}

	render(){
		//margin = {[20, 20]}
		//if date > current date map static grid items instead
		let {current, range} = this.state;

		return(
		<div>
			<ul className = "weekdays"><li>Monday</li>
			<li>Tuesday</li>
			<li>Wednesday</li>
			<li>Thursday</li>
			<li>Friday</li>
			<li>Saturday</li>
			<li>Sunday</li>
			</ul>
			<GridLayout className="layout" onDragStop = {this.onDragStop.bind(this)} preventCollision={true} cols={7} rowHeight={22} width={1140} isResizable = {false} compactType = {null}>
				{
				current.map(obj => 
					<div className = {colorScheme(obj.Status)} key = {obj.BookingID + Math.floor(Math.random()*100000)} data-grid={cellObject(range, obj)}><b>{obj.AnimalName}/{obj.FirstName} {obj.LastName}</b></div>
				)
				}
			</GridLayout>
		</div>
		)
	}
}

const header = {
	columnCount: 7
}