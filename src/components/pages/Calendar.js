// ---------------------------------------- TO DO ----------------------------------------
// css Calendar element width should be constant
'use babel';

import React from 'react';
import GridLayout from 'react-grid-layout';
import ReactDataGrid from 'react-data-grid';

let week = 0;

let dayCare = false;
let rows = [];
const rowGetter = rowNumber => rows[rowNumber];

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

async function updateDaysQuery(bookingObject){

	const sqlConfig = require('../../js/sqlconfig')
	const sql = require('mssql')
	let pool = await sql.connect(sqlConfig)

	let days = bookingObject.Days
	let bookingId = parseInt(bookingObject.BookingID)

	let queryString = "UPDATE dbo.BookingObjects SET dbo.BookingObjects.Days = '" + days + "' WHERE dbo.BookingObjects.BookingID = " + bookingId

	let result = await pool.request()
		 .query(queryString)

	let noDays = bookingObject.NoDays

	queryString = "UPDATE dbo.BookingObjects SET dbo.BookingObjects.NoDays = " + noDays + " WHERE dbo.BookingObjects.BookingID = " + bookingId

	result = await pool.request()
		 .query(queryString)

	sql.close()
}

export default class Calendar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			current_week : this.props.bookings.filter(filter_date),
			week : 0,
			calendar : 'List',
			cur_id : this.props.currentId,
			bookings_list : this.props.bookings, //isnt really necessary
			daycare: false,
			rows,
			selectedIndexes: [],
		}
		this._columns = [
			{ key: 'info', name: 'Client/Dog' },
			{ key: 'm', name: 'Monday'},
			{ key: 't', name: 'Tuesday' },
			{ key: 'w', name: 'Wednesday' },
			{ key: 'r', name: 'Thursday' },
			{ key: 'f', name: 'Friday' },
			{ key: 'total', name: 'Total'},
			{ key: 'co', name: 'Check-Out' } ];


		this.changeState = this.changeState.bind(this)
		this.nextWeek = this.nextWeek.bind(this)
		this.prevWeek = this.prevWeek.bind(this)
		this.getStatus = this.getStatus.bind(this)
		this.getNextAction = this.getNextAction.bind(this)
		this.switch_booking = this.switch_booking.bind(this)
		this.switch_view = this.switch_view.bind(this)
		this.createRows = this.createRows.bind(this)
		this.rowGetter = this.rowGetter.bind(this)
		this.setRows = this.setRows.bind(this)
		this.emptyRows = this.emptyRows.bind(this)
		this.onCellSelected = this.onCellSelected.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if (nextProps && nextProps.bookings){
			this.setState({
				bookings_list: nextProps.bookings,
				current_week : nextProps.bookings.filter(filter_date)
			})
		}
	}

	nextWeek(){
		this.emptyRows()
		week = this.state.week + 1
		this.setState({
			week : week,
			current_week : this.props.bookings.filter(filter_date)
		})
	}

	prevWeek(){
		this.emptyRows()
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
	
	createRows(booking) {
		let day = (booking.Days)

		let total = booking.NoDays * booking.DayCareRate

		let taxRate = 8

		let tax = ((total*taxRate)/100)

		total = total + tax

		rows.push({
			info: booking.FirstName + ' ' + booking.LastName + '/' + booking.AnimalName,
			m: (day.includes("m")) ? 'X' : '',
			t: (day.includes("t")) ? 'X' : '',
			w: (day.includes("w")) ? 'X' : '',
			r: (day.includes("r")) ? 'X' : '',
			f: (day.includes("f")) ? 'X' : '',
			total: total.toFixed(2),
			co: 'button',
			booking: booking
			}
		);
	}

	rowGetter(i) {
			return this._rows[i];
	}


	onCellSelected ( rowIdx, idx )  {
		if(rowIdx.idx >= 1 && rowIdx.idx <= 5){
			switch(rowIdx.idx) {
				case 1:
					if( this._rows[rowIdx.rowIdx].m !== 'X'){
							this._rows[rowIdx.rowIdx].m = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
					this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'm'

							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate
						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = this._rows[rowIdx.rowIdx].total + total
					}
					else{
						this._rows[rowIdx.rowIdx].m = ''
						this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
						this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('m','');
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					break;
				case 2:
					if( this._rows[rowIdx.rowIdx].t !== 'X'){
							this._rows[rowIdx.rowIdx].t = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 't'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					else{
						this._rows[rowIdx.rowIdx].t = ''
						this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
						this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('t','');
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					break;
				case 3:
					if( this._rows[rowIdx.rowIdx].w !== 'X'){
							this._rows[rowIdx.rowIdx].w = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'w'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					else{
						this._rows[rowIdx.rowIdx].w = ''
						this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
						this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('w','');
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					break;
				case 4:
					if( this._rows[rowIdx.rowIdx].r !== 'X'){
							this._rows[rowIdx.rowIdx].r = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'r'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					else{
						this._rows[rowIdx.rowIdx].r = ''
						this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
						this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('r','');
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					break;
				case 5:
					if( this._rows[rowIdx.rowIdx].f !== 'X'){
							this._rows[rowIdx.rowIdx].f = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
					this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'f'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					else{
						this._rows[rowIdx.rowIdx].f = ''
						this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
						this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('f','');
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

						let taxRate = 8

					let tax = ((total*taxRate)/100)

					total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
					}
					break;
		}
		updateDaysQuery(this._rows[rowIdx.rowIdx].booking)
		this.setRows()
	}
	};

	setRows(){
	this._rows = rows;
	};

	emptyRows(){
		rows = []
		this._rows = []
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
			if (this.state.calendar == 'Grid'){
				const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
				return(
					<div className="box cal">
					<div>
						<select className = "calendarSwitch" onChange = {this.switch_booking} value = {this.state.daycare}>
							<option value = {true}>Daycare</option>
							<option value = {false}>Boarding</option>
						</select>
						<button className = "profileButton" onClick = {this.nextWeek}> Prev </button>
						<h6 style = {{width:'550px', alignText:'center'}}>  {printDate(range.mon)} / {printDate(range.sun)}  </h6>
						<button className = "profileButton" onClick = {this.prevWeek}> Next </button>
						<select className = "calendarSwitch" onChange = {this.switch_view} value = {this.state.calendar}>
							<option value = {"List"}>List</option>
							<option value = {"Grid"}>Grid</option>
						</select>
						<br></br>
					</div>
				{current_week.filter(filter_daycare).map(obj => //arrow function instead
					<div key = {obj.BookingID}>
						{this.createRows(obj)}
					</div>
					)
				}
				{this.setRows()}
				<div style={{marginTop: '20px'}} >
					 <ReactDataGrid
					 ref={ node => this.grid = node }
									columns={this._columns}
									rowGetter={this.rowGetter}
									rowsCount={this._rows.length}
									minHeight={500}
					enableCellSelect={true}
								onCellSelected={this.onCellSelected}
									 />
								</div>
				</div>);
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
						<select className = "calendarSwitch" onChange = {this.switch_view} value = {this.state.calendar}>
							<option value = {"List"}>List</option>
							<option value = {"Grid"}>Grid</option>
						</select>
						<br></br>
					</div>
					<table className = "table table-hover" style={{marginTop: '20px'}}>
						<thead>
							<tr>
								<th style={{width: '10%'}}>Dog Name</th>
								<th style={{width: '20%'}}>Client Name</th>
								<th style={{width: '23%'}}>Date In</th>
								<th style={{width: '23%'}}>Date Out</th>
								<th style={{width: '24%'}}>Status</th>
							</tr>
						</thead>
						<tbody>
					{
					current_week.filter(filter_daycare).map(obj => //arrow function instead
						<tr style={{height: '50px'}} key = {obj.BookingID}>
								<td>{obj.AnimalName}</td>
								<td>{obj.FirstName} {obj.LastName}</td>
								<td>{parseDate(obj.DateIn)}</td>
								<td>{parseDate(obj.DateOut)}</td>
								<td><span style = {this.getStatus(obj) == ('Checked-Out') ? coStyle : this.getStatus(obj) == ('Checked-In') ? ciStyle : notStyle}><b>{this.getStatus(obj)}</b></span>
								{this.getStatus(obj) == ('Checked-Out') ? '' : <button style={{right:'0px'}} className = "profileButton" onClick ={() => {this.changeState(obj)}}> {this.getNextAction(obj)} </button> }</td>
						</tr>
						)
					}
					</tbody>
					</table>
				</div>);
			}
		}
		else
			 return (<div className="box cal"><h1>This is calendar</h1><br></br></div>);
	}
}

const coStyle = {
	color : "green",
	paddingRight : 10
}

const notStyle = {
	color : "red",
	paddingRight : 10
}

const ciStyle = {
	color : "#CCCC00",
	paddingRight : 10
}

const left = {
	display : "inline-block",
	margin : "10px"
}
