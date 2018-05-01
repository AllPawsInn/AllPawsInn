//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
const booking_lib = require('../../js/bookinglib')

function create_date(datestr){
	let dt_in = datestr.split('-')
	let buffer = new Date(Date.now())
	buffer.setMonth(dt_in[0] - 1)
	buffer.setDate(dt_in[1])
	buffer.setFullYear(dt_in[2])
	return buffer;
}

function form_date(datestr){
	return `${datestr.getDate()}-${datestr.getMonth() + 1}-${datestr.getFullYear()}`
}

async function get_available(){
	let result = await pool.request()
		.query("SELECT * FROM dbo.KennelOccupancy WHERE Occupancy = 0ORDER BY ID ASC|DESC;")
}

export default class Booking extends React.Component {
	constructor(props) {
		super(props)
		let date = new Date()

		this.state = {
			check : false,
			dropdown_pick : 0,
			animal: this.props.animal,
			book : []
		}

		for(let i = 0; i < this.props.animal.length; i++){
			this.state.book[i] = {
				FirstName: this.props.animal[i].FirstName,
				LastName : this.props.animal[i].LastName,
				AnimalID: this.props.animal[i].AnimalID,
				Status: "NCI",
				Breed : this.props.animal[i].Breed,
				DayCare : false, //this will probably be broken after multiple booking checks
				AnimalName : this.props.animal[i].AnimalName,
				KennelID : 1, //to-do first available kennel
				DateIn : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
				DateOut : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
				Days: 1,
				BoardingRate : 35,
				Discount: 0
			}
		}

		this.dateinChange = this.dateinChange.bind(this)
		this.dateoutChange = this.dateoutChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.submitAll = this.submitAll.bind(this)
		this.check = this.check.bind(this)
		this.popBooking = this.popBooking.bind(this)
		this.dropdownSelected = this.dropdownSelected.bind(this)

	}

	dateinChange(event){
		this.state.book[this.state.dropdown_pick].DateIn = create_date(event)
	}

	dateoutChange(event){
		this.state.book[this.state.dropdown_pick].DateOut = create_date(event)
	}

	check(){
		this.state.book[this.state.dropdown_pick].DayCare = !this.state.book[this.state.dropdown_pick].DayCare
		this.setState({
			check : this.state.check //dummy
		})
	}

	popBooking(){
		let dummy = this.state.book
		if (dummy.length > 1) {
			dummy.splice([this.state.dropdown_pick], 1)
			if (this.state.dropdown_pick != 0)
				this.state.dropdown_pick--
			this.setState({
				book : dummy
			})
		}
		else
			this.props.updateScreen("home")
	}

	handleSubmit(event){
		event.preventDefault();

		let {dropdown_pick, book} = this.state;
		let sqlArray = []
		//can make this block a function and use in the submitAll function aw to prevent redundant code
		let sql_obj = {
			DayCare : book[dropdown_pick].DayCare ? 1 : 0,
			AnimalID : book[dropdown_pick].AnimalID,
			KennelID: book[dropdown_pick].KennelID,
			DateIn : book[dropdown_pick].DateIn,
			DateOut : book[dropdown_pick].DateOut,
			BoardingRate : book[dropdown_pick].BoardingRate,
			Discount: book[dropdown_pick].Discount,
			Status: 'NCI'
		}
		sqlArray.push(sql_obj)

		book[dropdown_pick].BookingID = ++this.props.id_object.booking_id
		this.props.bookings.push(book[dropdown_pick])

		booking_lib.create_booking(sqlArray)
		this.props.updateScreen("home")

	}

	submitAll(){

		let {book} = this.state;

		let sqlArray = []
		for(let i = 0; i < book.length; i++){
			let sql_obj = {
				DayCare : book[i].DayCare ? 1 : 0,
				AnimalID : book[i].AnimalID,
				KennelID: book[i].KennelID,
				DateIn : book[i].DateIn,
				DateOut : book[i].DateOut,
				BoardingRate : book[i].BoardingRate,
				Discount: book[i].Discount,
				Status: 'NCI'
			}
			//clean this pack up
			sqlArray.push(sql_obj)
			book[i].BookingID = ++this.props.id_object.booking_id
			this.props.bookings.push(book[i])
		}
		booking_lib.create_booking(sqlArray)
		this.props.updateScreen("home")
	}

	handleChange(event){//test this
		let dummy = this.state.book
		dummy[this.state.dropdown_pick][event.target.name] = event.target.value
		this.setState({
			book : dummy
		})
	}

	dropdownSelected(event){
		this.setState({
			dropdown_pick: event.target.value
		})
	}

	componentWillReceiveProps(nextProps) {
		let date = new Date()
	  // You don't have to do this check first, but it can help prevent an unneeded render
	  if (nextProps.animal !== this.state.animal) {
	  	this.state.book = []
	  	for(let i = 0; i < nextProps.animal.length; i++){
				this.state.book[i] = {
					FirstName: nextProps.animal[i].FirstName,
					LastName : nextProps.animal[i].LastName,
					AnimalID: nextProps.animal[i].AnimalID,
					Status: "NCI",
					Breed : nextProps.animal[i].Breed,
					DayCare : false, //this will probably be broken after multiple booking checks
					AnimalName : nextProps.animal[i].AnimalName,
					KennelID : 1, //to-do first available kennel
					DateIn : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
					DateOut : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
					Days: 1,
					BoardingRate : 35,
					Discount: 0
				}
			}
	    this.setState({
	     dropdown_pick: 0,
	     animal : nextProps.animal
	   });
	  }
	}

	render(){
		let {dropdown_pick, book} = this.state;
		//default date value
		//disabled vs readonly fields
		//default kennel unit?
		//calendar no hour input atm
		//value wont change when a new reservation is prompted while already on the booking pag
		let dropdown = [];
		for (let i = 0; i < book.length; i++) {
		    dropdown.push(<option key={i} value={i}>{`${book[i].FirstName} ${book[i].LastName} - ${book[i].AnimalName}`}</option>);
		}

		//get rid of retarded date picker :)
		// <b>Date In</b><Calendar name = "DateIn" format = 'MM/DD/YYYY' date = {form_date(book[dropdown_pick].DateIn)} onChange = {this.dateinChange}/><br></br>
		// <b>Date Out</b><Calendar name = "DateOut" format = 'MM/DD/YYYY' date = {form_date(book[dropdown_pick].DateIn)} onChange = {this.dateoutChange}/><br></br>

		return(
			<div className = "box cal">
				<h3>Booking</h3>
				<select onChange = {this.dropdownSelected} label="Multiple Select" multiple>
					{dropdown}
				</select><br></br>
				<b>Daycare</b><input onChange = {this.check} name = "DayCare" type = "checkbox" checked = {this.state.book[this.state.dropdown_pick].DayCare}/><br></br>
				<br></br>
				<div className = "box">
					<b>Client Name</b><input disabled type = "text" value = {`${book[dropdown_pick].FirstName} ${book[dropdown_pick].LastName}`} />
					<button className = "bookingbutton" onClick = {this.popBooking}> X </button><br></br>
					<b>Animal Name</b><input disabled type = "text" value = {book[dropdown_pick].AnimalName}/><br></br>
					<b>Animal Breed</b><input disabled type = "text" value = {book[dropdown_pick].Breed}/><br></br>
					<b>Kennel Unit</b><input name = "KennelID" type = "text"  value = {book[dropdown_pick].KennelID} onChange = {this.handleChange}/><br></br>
					<b>Date In</b><Calendar name = "DateIn" format = 'MM/DD/YYYY' date = '4-17-2018' onChange = {this.dateinChange}/><br></br>
					<b>Date Out</b><Calendar name = "DateOut" format = 'MM/DD/YYYY' date = '4-17-2018' onChange = {this.dateoutChange}/><br></br>
					<b>Days</b><input name = "Days" type = "text" value = {book[dropdown_pick].Days} onChange = {this.handleChange}/><br></br>
					<b>Boarding Rate   $</b><input name = "BoardingRate" type = "text" value = {book[dropdown_pick].BoardingRate} onChange = {this.handleChange}/><br></br>
					<b>Discount Rate   %</b><input name = "Discount" type = "text" value = {book[dropdown_pick].Discount} onChange = {this.handleChange}/><br></br>
					<div id="submitInput">
						<button className = "profileButton" onClick = {this.handleSubmit}> Submit </button>
					</div>
				</div>
				<div id="submitInput">
						<button className = "profileButton" onClick = {this.submitAll}>Submit All</button>
				</div>

			</div>
		)
	}

}

const left = {
	display : "inline-block",
	margin : "10px"
}
