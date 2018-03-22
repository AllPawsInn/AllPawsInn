'use babel';

import React from 'react';



export default class Payment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			booking : this.props.booking
		}
		this.getSubTotal = this.getSubTotal.bind(this)
		this.getTotal = this.getTotal.bind(this)
		this.getTax = this.getTax.bind(this)
		this.getTotalToPay = this.getTotalToPay.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	getSubTotal(booking){
		let rate = 0
		if(booking.DayCare){
			rate = booking.DayCareRate
		}
		else{
			rate = booking.BoardingRate
		}
		let total = booking.NoDays * rate

		return total
	}

	getTotal(booking){
		let total = this.getSubTotal(booking)
		let discoRate = 0

		if(Array.isArray(booking.Discount)){
			discoRate = booking.Discount[0]
		}

		let disco = (total*discoRate)/100

		total -= disco

		return total
	}

	getTax(booking){
		let total = this.getTotal(booking)

		let taxRate = 8

		let tax = ((total*taxRate)/100)

		return tax
	}

	getTotalToPay(booking){
		let total = this.getTotal(booking)
		let tax  = this.getTax(booking)
		let pay  = total + tax

		return pay
	}

	handleSubmit(event){
		this.props.updateScreen("home")
	}

	render(){
		let booking = this.state.booking;
		console.log(booking);

		return (
			<div className = "box cal">
			<h1>Payment</h1>
			<h3>Booking</h3>
			<div className = "box" style = {left}>
				Animal Name: <b>{this.props.booking.AnimalName !=  null ? this.props.booking.AnimalName : ''}</b><br></br>
				Client Name: <b>{this.props.booking.FirstName} {this.props.booking.LastName}</b><br></br>
				Booking Ref: <b>{this.props.booking.BookingID}</b><br></br>
				Kennel ID: <b>{this.props.booking.KennelID}</b><br></br>
				Animal Breed: <b>{this.props.booking.Breed}</b><br></br>
				Animal Size: <b>{this.props.booking.Size}</b><br></br>
				Date In: <b>{this.props.booking.DateIn.toString()}</b><br></br>
				Date Out: <b>{this.props.booking.DateOut.toString()}</b><br></br>
				Days: <b>{this.props.booking.NoDays}</b><br></br>
			</div>
			<div className = "box" style = {left}>
				Boarding Rate: <b>$ {this.props.booking.BoardingRate !=  null ? this.props.booking.BoardingRate : ''}</b><br></br>
				Collection Day Discount: <b>% {this.props.booking.CollectionDayDiscount}</b><br></br>
				12hr Discount: <b>% {this.props.booking.HalfDayDiscount}</b><br></br>
				DayCare Rate: <b>$ {this.props.booking.DayCareRate}</b><br></br>
				Unit Type Surcharge Rate: <b>$ {this.props.booking.UnitTypeSurcharge}</b><br></br>
				Peak Period Surcharge: <b>$ {this.props.booking.PeakPeriodSurcharge}</b><br></br>
				Extended Stay Period: <b>{this.props.booking.ExtendedStayPeriod} Days</b><br></br>
				Extended Stay Discount: <b>% {this.props.booking.ExtendedStayDiscount}</b><br></br>
				Linked Booking Discount: <b>% {this.props.booking.LinkedBookingDiscount}</b><br></br>
			</div>
			<div className = "box" style = {left}>
				Sub Total: <b>$ {this.getSubTotal(booking).toFixed(2)}</b><br></br>
				Discount: <b>% {!Array.isArray(this.props.booking.Discount) ? '0' : this.props.booking.Discount[0]}</b><br></br>
				TOTAL: <b>$ {this.getTotal(booking).toFixed(2)}</b><br></br>
			</div>
			<br></br>
			<h3>Total Charges</h3>
			<div className = "box">
				<form onSubmit = {this.handleSubmit}>
					<b>Net Booking Charges   $</b>
					<input disabled name = "booking_charges" type = "text" value = {`${this.getTotal(booking).toFixed(2)}`}/><br></br>
					<b>NY State Tax   $</b>
					<input disabled name = "tax_charges" type = "text" value = {`${this.getTax(booking).toFixed(2)}`}/><br></br>
					<hr></hr>
					<b>Total To Pay   $</b>
					<input disabled name = "tax_charges" type = "text" value = {`${this.getTotalToPay(booking).toFixed(2)}`}/><br></br>
					<hr></hr>
					<span style={left}><input type = "Submit" value = "Take Payment"/></span>
				</form>
			</div>
			</div>
			)
		}

	}

	const left = {
		display : "inline-block",
		margin : "10px"
	}