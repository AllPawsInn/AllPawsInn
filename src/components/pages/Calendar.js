// ---------------------------------------- TO DO ----------------------------------------
// css Calendar element width should be constant
'use babel';

import React from 'react';
import GridLayout from 'react-grid-layout';
let week = 0;
let dayCare = false;

//move constants to a new js file
const load_pages = 7
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


function printDate(date){
	return `${date.getDate()} ${dayNames[date.getDay()]} ${monthNames[date.getMonth()]}`
}

function parseDate(date){
	return date.toString().split('GMT')[0]
}

function filter_date(booking){
	//keep week on an array iterate within that
	let range = getDateRange(week)
	return (booking.DateIn < range.sun && booking.DateIn > range.mon) || (booking.DateOut < range.sun && booking.DateOut > range.mon)
	//booking.DayCare == (dayCare == 'true') && 
}

function filter_daycare(booking){
	return booking.DayCare == (dayCare == 'true')
}

//can just use moment.js and avoid the fuss beleow
function getDateRange(week){

	//keep this on calendar or app?
	//no need to reboot app vs less code executed

	//clean this up
	//day switch
	let td = new Date()	;
	td = new Date(td - 604800000 * week);
	let day = td.getDay() || 7; 	  // Get current day number, converting Sun. to 7
	if (day !== 1)              	  // Only manipulate the date if it isn't Mon.
		td.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
									  // multiplied by negative 24
	td.setHours(0)
	td.setMinutes(0)
	td.setSeconds(0)

	return {
		mon : td,
		sun : new Date(td.valueOf() + 604800000 - 1000)
	}
}

async function updateStatusQuery(bookingObject){

	const sqlConfig = require('../../js/sqlconfig')
	const sql = require('mssql')
	let pool = await sql.connect(sqlConfig)

	let stat = bookingObject.Status
	let bookingId = parseInt(bookingObject.BookingID)

	let queryString = "UPDATE dbo.BookingObjects SET dbo.BookingObjects.Status = '" + stat + "' WHERE dbo.BookingObjects.BookingID = " + bookingId

	let result = await pool.request()
	 	 .query(queryString)

	sql.close()
}

export default class Calendar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			current_week : this.props.bookings.filter(filter_date),
			week : 0,
			calendar : false,
			cur_id : this.props.currentId,
			bookings_list : this.props.bookings, //isnt really necessary
			daycare: false,
		}
		this.changeState = this.changeState.bind(this)
		this.nextWeek = this.nextWeek.bind(this)
		this.prevWeek = this.prevWeek.bind(this)
		this.getStatus = this.getStatus.bind(this)
		this.getNextAction = this.getNextAction.bind(this)
		this.switch_booking = this.switch_booking.bind(this)
		this.switch_view = this.switch_view.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if (nextProps && nextProps.bookings){
			this.setState({
				bookings_list: nextProps.bookings,
			})
		}
	}

	nextWeek(){
		week = this.state.week + 1
		this.setState({
			week : week,
			current_week : this.props.bookings.filter(filter_date)
		})
	}

	prevWeek(){
		week = this.state.week - 1
		this.setState({
			week : week,
			current_week : this.props.bookings.filter(filter_date)
		})
	}

	changeState(obj){

		// NCO - Not Checked Out
		// NCI - Not Checked In
		// CO - Checked Out
		// CI - Checked In
		let status = '';

		if(obj.Status == "NCI")
			status = "CI"
		else{
			if(obj.Status == "CI")
				status = "CO"
			else if(obj.Status == "NCO")
				status = "CO"
			else
				status = "CO"

			this.props.payment(obj)
		}

		obj.Status = status

		updateStatusQuery(obj)

		this.setState({
			week : this.state.week
		})
	}

	switch_view(event){
		this.setState({
			calendar : event.target.value
		})
	}

	switch_booking(event){
		dayCare = event.target.value
		this.setState({
			daycare: event.target.value //dummy
		})
	}

	getStatus(booking){
		if(booking.Status == "NCI")
			return "Not Checked-In"
		else if(booking.Status == "CI")
			return "Checked-In"
		else if(booking.Status == "NCO")
			return "Not Checked-Out"
		else
			return "Checked-Out"
	}

	getNextAction(booking){
		if(booking.Status == "NCI")
			return "Check-In"
		else if(booking.Status == "CI")
			return "Check-Out"
		else if(booking.Status == "NCO")
			return "Check-Out"
		else
			return "Check-Out"
	}

	render() {
		var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
		week = this.state.week;
		//to do // have current week's bookings in a new array as another state property
						// avoid iterating over all the bookings on a daycare/boarding switch
		let range = getDateRange(week)
		// encountered an issue on calculation in first week of march due to daylight saving time calculations
		// getDateRarnge.sun will also be a monday due to that excess 1 hour
		// fix if possible
		let {bookings_list, current_week} = this.state;
		//<button onClick ={() => {this.getCheckOutScreen(obj)}}> {this.getNextAction(obj)} </button>
		//this.getStatus(obj) == ('Not Checked-In') ?
		if (bookings_list){
			if (this.state.calendar){
				return(
				<div className="box cal">
					<div>
						<select className = "calendarSwitch" onChange = {this.switch_booking} value = {this.state.daycare}>
							<option value = {true}>Daycare</option>
							<option value = {false}>Boarding</option>
						</select>
						<button className = "profileButton" onClick = {this.nextWeek}> Prev </button>
						<h6>  {printDate(range.mon)} / {printDate(range.sun)}  </h6>
						<button className = "profileButton" onClick = {this.prevWeek}> Next </button>
						<select className = "calendarSwitch" onChange = {this.switch_view} value = {this.state.calendar}>
							<option value = {true}>List</option>
							<option value = {false}>Grid</option>
						</select>
						<br></br>
						<br></br>
					</div>
					<div className = "center"><h2>    Monday     Tuesday   Wednesday   Thursday     Friday      Saturday      Sunday</h2></div>
					
					<GridLayout className="layout" cols={12} rowHeight={10} width={1900} isResizable = {false}>
		        <div className = "red" key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}><b>{bookings_list[1300].AnimalName}/{bookings_list[1300].FirstName} {bookings_list[1300].LastName}</b></div>
		        <div className = "b" key="b" data-grid={{x: 1, y: 0, w: 1, h: 2, minW: 2, maxW: 4}}>b</div>
		        <div className = "b" key="z" data-grid={{x: 2, y: 0, w: 1, h: 2, minW: 2, maxW: 4}}>b</div>
		        <div className = "yellow" key="d" data-grid={{x: 3, y: 0, w: 1, h: 2}}><b>{bookings_list[1200].AnimalName}/{bookings_list[1200].FirstName} {bookings_list[1200].LastName}</b></div>
		        <div className = "green" key="e" data-grid={{x: 4, y: 0, w: 1, h: 2}}><b>{bookings_list[1201].AnimalName}/{bookings_list[1201].FirstName} {bookings_list[1201].LastName}</b></div>
		        <div className = "c" key="f" data-grid={{x: 5, y: 0, w: 1, h: 2}}>c</div>
		        <div className = "c" key="g" data-grid={{x: 6, y: 0, w: 1, h: 2}}>c</div>
		        <div className = "c" key="j" data-grid={{x: 0, y: 1, w: 1, h: 2}} >c</div>
		        <div className = "b" key="1" data-grid={{x: 1, y: 1, w: 1, h: 2, minW: 2, maxW: 4}}>b</div>
		        <div className = "c" key="2" data-grid={{x: 2, y: 1, w: 1, h: 2}}>c</div>
		        <div className = "c" key="3" data-grid={{x: 3, y: 1, w: 1, h: 2}}>c</div>
		        <div className = "yellow" key="4" data-grid={{x: 4, y: 1, w: 1, h: 2}}><b>{bookings_list[1204].AnimalName}/{bookings_list[1204].FirstName} {bookings_list[1204].LastName}</b></div>
		        <div className = "c" key="5" data-grid={{x: 5, y: 1, w: 1, h: 2}}>c</div>
		        <div className = "green" key="6" data-grid={{x: 6, y: 1, w: 1, h: 2}}><b>{bookings_list[1202].AnimalName}/{bookings_list[1202].FirstName} {bookings_list[1202].LastName}</b></div>
		        <div className = "c" key="7" data-grid={{x: 0, y: 2, w: 1, h: 2}} >c</div>
		        <div className = "b" key="8" data-grid={{x: 1, y: 2, w: 1, h: 2, minW: 2, maxW: 4}}>b</div>
		        <div className = "c" key="9" data-grid={{x: 2, y: 2, w: 1, h: 2}}>c</div>
		        <div className = "c" key="10" data-grid={{x: 3, y: 2, w: 1, h: 2}}>c</div>
		        <div className = "c" key="11" data-grid={{x: 4, y: 2, w: 1, h: 2}}>c</div>
		        <div className = "c" key="12" data-grid={{x: 5, y: 2, w: 1, h: 2}}>c</div>
		        <div className = "green" key="13" data-grid={{x: 6, y: 2, w: 1, h: 2}}><b>{bookings_list[1207].AnimalName}/{bookings_list[1207].FirstName} {bookings_list[1207].LastName}</b></div>
	        </GridLayout>
      	 </div>
      	 )
			}
			else{
				return(
				<div className="box cal">
					<div>
						<select className = "calendarSwitch" onChange = {this.switch_booking} value = {this.state.daycare}>
							<option value = {true}>Daycare</option>
							<option value = {false}>Boarding</option>
						</select>
						<button className = "profileButton" onClick = {this.nextWeek}> Prev </button>
						<h6>  {printDate(range.mon)} / {printDate(range.sun)}  </h6>
						<button className = "profileButton" onClick = {this.prevWeek}> Next </button>
						<select className = "calendarSwitch" onChange = {this.switch_view} value = {true}>
							<option value = {true}>List</option>
							<option value = {false}>Grid</option>
						</select>
						<br></br>
					</div>
					{
					current_week.filter(filter_daycare).map(obj => //arrow function instead
						<div key = {obj.BookingID}>
							<hr></hr>
							<div className = "box" style = {left}>
								Dog Name: <b>{obj.AnimalName}</b><br></br>
								Client Name: <b>{obj.FirstName} {obj.LastName}</b><br></br>
								Breed: <b>{obj.Breed}</b>
							</div>
							<div className = "box" style = {left}>
								DateIn : <b>{parseDate(obj.DateIn)}</b><br></br>
								DateOut : <b>{parseDate(obj.DateOut)}</b><br></br>
							</div>
							<div className = "box" style = {left}>
								<h6>Status :</h6> <span style = {this.getStatus(obj) == ('Checked-Out') ? coStyle : this.getStatus(obj) == ('Checked-In') ? ciStyle : notStyle}><b>{this.getStatus(obj)}</b></span>
								<br></br>
								{this.getStatus(obj) == ('Checked-Out') ? '' :  <button className = "profileButton" onClick ={() => {this.changeState(obj)}}> {this.getNextAction(obj)} </button>  }
							</div>
						</div>
						)
					}
				</div>);
			}
		}
		else
			 return (<div className="box cal"><h1>This is calendar</h1><br></br></div>);
	}
}

const coStyle = {
	color : "green"
}

const notStyle = {
	color : "red"
}

const ciStyle = {
	color : "#CCCC00"
}

const left = {
	display : "inline-block",
	margin : "10px"
}