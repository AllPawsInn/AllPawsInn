// ---------------------------------------- TO DO ----------------------------------------
// css Calendar element width should be constant

'use babel';


import React from 'react';
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

function filter_date(booking){
	let range = getDateRange(week)
	return booking.DayCare == (dayCare == 'true') && ((booking.DateIn < range.sun && booking.DateIn > range.mon) || (booking.DateOut < range.sun && booking.DateOut > range.mon))
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

	const sqlConfig = require('../sqlconfig')
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
			current_page : 0,
			week : 0,
			cur_id : this.props.currentId,
			bookings_list : this.props.bookings,
			daycare: false,
		}
		this.changeState = this.changeState.bind(this)
		this.nextWeek = this.nextWeek.bind(this)
		this.prevWeek = this.prevWeek.bind(this)
		this.getStatus = this.getStatus.bind(this)
		this.getNextAction = this.getNextAction.bind(this)
		this.switch_booking = this.switch_booking.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if (nextProps && nextProps.bookings){
			this.setState({
				bookings_list: nextProps.bookings,
			})
		}
	}

	nextWeek(){
		this.setState({
			week : this.state.week + 1
		})
	}

	prevWeek(){
		this.setState({
			week : this.state.week - 1
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
		week = this.state.week;
		let range = getDateRange(week)
		// encountered an issue on calculation in first week of march due to daylight saving time calculations
		// getDateRarnge.sun will also be a monday due to that excess 1 hour
		// fix if possible
		let {bookings_list} = this.state;
		//<button onClick ={() => {this.getCheckOutScreen(obj)}}> {this.getNextAction(obj)} </button>

		//this.getStatus(obj) == ('Not Checked-In') ?
		if (bookings_list){
			return(
			<div className="box cal">
			<div>
				<button className = "profileButton" onClick = {this.nextWeek}> Prev </button>
				<h6>  {printDate(range.mon)} / {printDate(range.sun)}  </h6>
				<button className = "profileButton" onClick = {this.prevWeek}> Next </button>
				<select className = "calendarSwitch" onChange = {this.switch_booking} value = {this.state.daycare}>
					<option value = {true}>Daycare</option>
					<option value = {false}>Boarding</option>
				</select>
				<br></br>
			</div>
			{
			bookings_list.filter(filter_date).map(obj => //arrow function instead
				<div key = {obj.BookingID}>
					<div className = "box" style = {left}>
						Dog Name: <b>{obj.AnimalName}</b><br></br>
						Client Name: <b>{obj.FirstName} {obj.LastName}</b><br></br>
						Breed: <b>{obj.Breed}</b>
					</div>
					<div className = "box" style = {left}>
						DateIn : <b>{obj.DateIn.toString()}</b> <br></br>
						DateOut : <b>{obj.DateOut.toString()}</b> <br></br>
					</div>
					<div className = "box" style = {left}>
						<h6>Status :</h6> <span style={this.getStatus(obj) == ('Checked-Out') ? coStyle : this.getStatus(obj) == ('Checked-In') ? ciStyle : notStyle}><b>{this.getStatus(obj)}</b></span>
						<br></br>
						{this.getStatus(obj) == ('Checked-Out') ? '' :  <button className = "profileButton" onClick ={() => {this.changeState(obj)}}> {this.getNextAction(obj)} </button>  }
					</div>
					<hr></hr>
				</div>
				)
			}
			</div>);
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