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

export default class Booking extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			check : false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.check = this.check.bind(this)
	}

	check(){
		this.setState({
			check : !this.state.check
		})
		console.log(this.state.check)
	}

	handleSubmit(event){
		event.preventDefault();

		//hardcode
		let obj = {
			DayCare : this.state.check ? 1 : 0,
			client : event.target[0].value,
			animal : event.target[1].value,
			type : event.target[2].value,
			kennel : event.target[3].value,
			DateIn : create_date(event.target[4].value),
			DateOut : create_date(event.target[5].value)
		}

		//clean this pack up
		let tmp = booking_lib.create_booking(this.props.animal, obj)
		tmp.BookingID = this.props.id_object.booking_id++
		this.props.bookings.push(tmp)
		// buffer array until a neat way to put array push /w set state
		this.props.updateScreen("home")

	}

	render(){
		//default date value
		//disabled vs readonly fields
		//default kennel unit?
		//calendar no hour input atm
		//value wont change when a new reservation is prompted while already on the booking page
		return (
			<div className = "box cal">
				<h1>Booking</h1>
				<b>Daycare</b><input onChange = {this.check} type = "checkbox" checked = {this.state.check}/><br></br>
				<form onSubmit = {this.handleSubmit}>
					<br></br>
					<div className = "box">
						<b>Client Name</b><input disabled name = "client_name" type = "text" value = {`${this.props.animal.FirstName} ${this.props.animal.LastName}`}/><br></br>
						<b>Animal Name</b><input disabled name = "animal_name" type = "text" value = {this.props.animal.AnimalName}/><br></br>
						<b>Animal Breed</b><input disabled name = "type" type = "text" value = {this.props.animal.Breed}/><br></br>
						<b>Kennel Unit</b><input name = "kennel_unit" type = "number" value = {1}/><br></br>
						<b>Date In</b><Calendar format = 'MM/DD/YYYY' date = '3-20-2018'/><br></br>
						<b>Date Out</b><Calendar format = 'MM/DD/YYYY' date = '3-25-2018'/><br></br>
						<input type = "Submit" value = "Submit"/>
					</div>
				</form>
			</div>
		)
	}

}