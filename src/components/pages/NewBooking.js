//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
const booking_lib = require('../../js/bookinglib')

function create_date(datestr){
	let dt_in = datestr.split('/')
	let buffer = new Date(Date.now())
	buffer.setMonth(dt_in[0] - 1)
	buffer.setDate(dt_in[1])
	buffer.setFullYear(dt_in[2])
	return buffer;
}

export default class NewBooking extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id : this.props.id_object
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleSubmit(event){
		event.preventDefault();

		//hardcode
		//would be nicer to iterate the array

		let client_details = {

		}

		let animal = {

		}

		let obj = {
			FirstName : event.target[0].value,
			LastName : event.target[1].value,
			animal : event.target[2].value,
			type : event.target[3].value,
			kennel : event.target[4].value,
			DateIn : create_date(event.target[5].value),
			DateOut : create_date(event.target[6].value)
		}


		//	let num = await pool.request()
			 // .query("SELECT top 1 * from dbo.BookingObjects order by BookingID desc") //client
		//if err sql.close

		//make new client and animal database entry
		//clean this pack up
		let tmp = booking_lib.create_booking(this.props.animal, obj)
		tmp.BookingID = this.props.id_object.current_id++
		this.props.bookings.push(tmp)
		// buffer array until a neat way to put array push /w set state
		this.props.updateScreen("home")

	}

	render(){
		//default date value
		//disabled vs readonly fields
		//default kennel unit?
		//calendar no hour input atm
		return (
			<div className = "box cal">
				<h1>New Booking</h1>
				<form onSubmit = {this.handleSubmit}>
					<br></br>
					<b><h2>Client</h2></b>
					<div className = "box">
						<b>First Name</b><input name = "FirstName" type = "text"/><br></br>
						<b>Last Name</b><input name = "LastName" type = "text"/><br></br>
						<b>Address</b><input name = "Address1"type = "text"/><br></br>
						<b>Email</b><input name = "LastName" type = "text"/><br></br>
						<b>Postcode ZIP</b><input name = "PostcodeZIP" type = "text"/><br></br>
						<b>Partner Name</b><input name = "PartnerName" type = "text"/><br></br>
						<b>Practice Name</b><input name = "PracticeName" type = "text"/><br></br>
						<b>Contact(Home)</b><input name = "TelHome" type = "text"/><br></br>
						<b>Contact(Work)</b><input name = "TelWork" type = "text"/><br></br>
						<b>Allow Mailings</b>
						<select name = "Mailings">
						  <option value = "Yes">Yes</option>
						  <option value = "No">No</option>
					  </select>
					</div>
					<br></br>
					<b><h2>Animal</h2></b>
					<div className = "box">
						<b>Animal Name</b><input name = "animal_name" type = "text"/><br></br>
						<b>Animal Breed</b><input name = "type" type = "text"/><br></br>
						<b>Animal Sex</b><input name = "sex" type = "text"/><br></br>
						<b>Kennel Unit</b> <input name = "kennel_unit" type = "number" value = {1}/><br></br>
						<b>Date In</b><Calendar format='MM/DD/YYYY' date = '3-20-2018'/><br></br>
						<b>Date Out</b><Calendar format='MM/DD/YYYY' date = '3-25-2018'/><br></br>
					</div>
					<br></br>
					<b><h2>Veterinary</h2></b>
					<div className = "box">
					</div>
					<input type = "Submit" value = "Submit"/>
				</form>
			</div>
		)
	}
}