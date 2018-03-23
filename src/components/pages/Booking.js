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
			check : false,
			rate: 35.00,
			disco: 0,
			days: 5,
			kennel: 1
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.check = this.check.bind(this)
		this.onRateChange = this.onRateChange.bind(this)
		this.onDiscoChange = this.onDiscoChange.bind(this)
		this.onDaysChange = this.onDaysChange.bind(this)
		this.onKennelChange = this.onKennelChange.bind(this)
	}

	check(){
		this.setState({
			check : !this.state.check
		})
	}

	handleSubmit(event){
		event.preventDefault();
		//hardcode

		let obj = {
			FirstName: this.props.animal.FirstName,
			LastName : this.props.animal.LastName,
			AnimalID: this.props.animal.AnimalID,
			Status: "NCI",
			Breed : this.props.animal.Breed,
			DayCare : this.state.check ? 1 : 0,
			AnimalName : this.props.animal.AnimalName,
			KennelID : event.target[3].value,
			DateIn : create_date(event.target[4].value),
			DateOut : create_date(event.target[5].value),
			Days: event.target[6].value,
			BoardingRate : event.target[7].value,
			Discount: event.target[8].value
		}

		let sql_obj = {
			DayCare : this.state.check ? 1 : 0,
			AnimalID : this.props.animal.AnimalID,
			KennelID: event.target[3].value,
			DateIn : create_date(event.target[4].value),
			DateOut : create_date(event.target[5].value),
			BoardingRate : event.target[7].value * 1,
			Discount: event.target[8].value * 1,
			Status: 'NCI'
		}

		//clean this pack up
		booking_lib.create_booking(sql_obj)
		obj.BookingID = this.props.id_object.booking_id++
		this.props.bookings.push(obj)
		// buffer array until a neat way to put array push /w set state
		this.props.updateScreen("home")

	}

	onRateChange(value){
    this.setState({
    	rate: value
    });
  }

  onDiscoChange(value){
    this.setState({
    	disco: value
    });
  }

  onDaysChange(value){
    this.setState({
    	days: value
    });
  }

  onKennelChange(value){
    this.setState({
    	kennel: value
    });
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
						<b>Animal Breed</b><input disabled name = "breed" type = "text" value = {this.props.animal.Breed}/><br></br>
						<b>Kennel Unit</b><input name = "kennel" type = "text"  value = {this.state.kennel} onChange={e => this.onKennelChange(e.target.value)}/><br></br>
						<b>Date In</b><Calendar format = 'MM/DD/YYYY' date = '3-20-2018'/><br></br>
						<b>Date Out</b><Calendar format = 'MM/DD/YYYY' date = '3-25-2018'/><br></br>
						<b>Days</b><input name = "days" type = "text" value = {this.state.days} onChange={e => this.onDaysChange(e.target.value)}/><br></br>
						<b>Boarding Rate   $</b><input name = "rate" type = "text" value = {this.state.rate} onChange={e => this.onRateChange(e.target.value)}/><br></br>
						<b>Discount Rate   %</b><input name = "disco" type = "text" value = {this.state.disco} onChange={e => this.onDiscoChange(e.target.value)}/><br></br>
						<span style={left}><input type = "Submit" value = "Submit"/></span>
					</div>
				</form>
			</div>
		)
	}

}

const left = {
	display : "inline-block",
	margin : "10px"
}