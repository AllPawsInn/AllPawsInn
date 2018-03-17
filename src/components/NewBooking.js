'use babel';

import React from 'react';

const sqlConfig = require('./sqlconfig')
const sql = require('mssql')

function sqlParse(val){ //sql requires date values to be in 02-07-2018 rather than 2-7-2017
	if (val < 10)
		return '0' + val
	else
		return val
}

async function insertDog(booking){

	let new_booking = JSON.parse(JSON.stringify(booking))
	forceDate(new_booking)
	let pool = await sql.connect(sqlConfig)
	let result = await pool.request()
		.query(`INSERT INTO BookingObjects (AnimalID, KennelID, DateIn, DateOut, Status) VALUES (${new_booking.animal_id}, ${new_booking.kennel_id}, '${new_booking.DateIn}', '${new_booking.DateOut}', '${new_booking.status}')`)
		//if err sql.close

	sql.close()
}

function toDatetime(date){
	let formatted = `${date.getFullYear()}-${sqlParse(date.getMonth() + 1)}-${sqlParse(date.getDate())}T${sqlParse(date.getHours())}:${sqlParse(date.getMinutes())}:${sqlParse(date.getSeconds())}`
	return formatted
}

function dateNow(){
	let dt = new Date ()
	return dt
}

function dateOut(epoch){
	//use an epoch converter to build the check out date
	//epoch is to supposed to be the appointment duration
	let dt = new Date (Date.now() + 604800000)
	return dt
}

function forceDate(booking){
	booking.DateIn = toDatetime(new Date(Date.parse(booking.DateIn)))
	booking.DateOut = toDatetime(new Date(Date.parse(booking.DateOut)))
}

function create_booking(animal){

	//push animal's and client's properties to booking
	let new_booking = {
		FirstName : animal.FirstName,
		LastName : animal.LastName,
		animal_id : animal.AnimalID,
		kennel_id : 20, //user prompted in the future
		DateIn : dateNow(),
		DateOut : dateOut(),
		status : "NCI"
	}

	insertDog(new_booking)

	return new_booking
}

export default class NewBooking extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id : this.props.id_object
		} 
	}

	render(){
		this.state.id = this.props.id_object

		//increment booking id
		this.state.id.current_id++

		let tmp = create_booking(this.props.animal)
		tmp.BookingID = this.state.id.current_id
		this.props.bookings.push(tmp)
		//create a booking here
		// animal.BookingID = this.state.id.current_id //questionable?

		//buffer array until a neat way to put array push /w set state
		// let bookings = this.state.booking_list

		return (
			<div>
				<h1>New Booking</h1>
			</div>
			)
	}

}