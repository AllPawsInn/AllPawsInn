'use babel';

import React from 'react';
let week = 0;

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
	return (booking.DateIn < range.sun && booking.DateIn > range.mon) || (booking.DateOut < range.sun && booking.DateOut > range.mon)
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

export default class Calendar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			current_page : 0,
			week : 0,
			cur_id : this.props.currentId,
			bookings_list : this.props.bookings
		}
		this.changeStatus = this.changeStatus.bind(this)
		this.nextWeek = this.nextWeek.bind(this)
		this.prevWeek = this.prevWeek.bind(this)

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

	changeStatus(event){

		// NCO - Not Checked Out
		// NCI - Not Checked In
		// CO - Checked Out
		// CI - Checked In

		let cur_content = event.currentTarget.innerHTML
		
		if (cur_content.includes("Not Checked In"))
			event.currentTarget.innerHTML = "Status : <!-- /react-text --><b>Checked In</b><!-- react-text: 304 -->"
		else if (cur_content.includes("Checked In"))
			event.currentTarget.innerHTML = "Status : <!-- /react-text --><b>Checked Out</b><!-- react-text: 304 -->"

	}

	render() {
		week = this.state.week;
		let range = getDateRange(week)
		let {bookings_list} = this.state;

		if (bookings_list){
			return(
			<div className="box item2">
			<div>
				<button onClick = {this.nextWeek}> left </button>
				<button onClick = {this.prevWeek}> right </button>
			</div>
			<div>{printDate(range.mon)} / {printDate(range.sun)}</div>

			{
			bookings_list.filter(filter_date).map(obj => //arrow function instead
				<div key = {obj.BookingID}>
					{obj.FirstName} {obj.LastName}/{obj.AnimalName}/{obj.Breed}<br></br>
					DateIn : {obj.DateIn.toString()} <br></br>
					DateOut : {obj.DateOut.toString()} <br></br>
					<div onClick = {this.changeStatus}>
						Status : <b>Not Checked In</b>
					</div>
				</div>
				)
			}
			</div>);
		}
		else{
			 return (
				<div className="box item2">
					<h1>This is calendar</h1><br></br>
				</div>
			);
		}
	}
}
