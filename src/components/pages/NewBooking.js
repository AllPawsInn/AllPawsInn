//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';

import Calendar from 'react-input-calendar'
const booking_lib = require('./bookinglib')


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
		let obj = {
			client : event.target[0].value,
			animal : event.target[1].value,
			type : event.target[2].value,
			kennel : event.target[3].value,
			DateIn : create_date(event.target[4].value),
			DateOut : create_date(event.target[5].value)
		}


		//	let num = await pool.request()
			 // .query("SELECT top 1 * from dbo.BookingObjects order by BookingID desc") //client
		//if err sql.close

		//make new client and animal database entry
		//increment booking id
		this.state.id.current_id++
		let tmp = booking_lib.create_booking(this.props.animal, obj)
		tmp.BookingID = this.state.id.current_id
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
			<div>
				<h1>New Booking</h1>
				<form onSubmit = {this.handleSubmit}>
					<br></br>
					<b>Client First Name</b> <input  name = "client_name" type = "text" /><br></br>
					<b>Client Last Name</b> <input  name = "client_name" type = "text" /><br></br>
					<b>Animal Name</b> <input  name = "animal_name" type = "text" /><br></br>
					<b>Animal Breed</b> <input  name = "type" type = "text" /><br></br>
					<b>Kennel Unit</b> <input name = "kennel_unit" type = "number" defaultValue = {1}/><br></br>
					<b>Date In</b> <Calendar format='MM/DD/YYYY' date = '3-20-2018' /><br></br>
					<b>Date Out</b> <Calendar format='MM/DD/YYYY' date = '3-25-2018' /><br></br>
					<input type = "Submit" value = "Submit"/>
				</form>

			</div>
			)
	}

}