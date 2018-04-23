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
		return (
			<div className = "box cal">
			<h1>Payment</h1>
			<h3>Booking</h3>
			<div className = "box" style = {left}>
				<b>Animal Name:</b> {this.props.booking.AnimalName !=  null ? this.props.booking.AnimalName : ''}<br></br>
				<b>Client Name:</b> {this.props.booking.FirstName} {this.props.booking.LastName}<br></br>
				<b>Booking Ref:</b> {this.props.booking.BookingID}<br></br>
				<b>Kennel ID:</b> {this.props.booking.KennelID}<br></br>
				<b>Animal Breed:</b> {this.props.booking.Breed}<br></br>
				<b>Animal Size:</b> {this.props.booking.Size}<br></br>
				<b>Date In:</b> {this.props.booking.DateIn.toString()}<br></br>
				<b>Date Out:</b> {this.props.booking.DateOut.toString()}<br></br>
				<b>Days:</b> {this.props.booking.NoDays}<br></br>
			</div>
			<div className = "box" style = {left}>
				<b>Boarding Rate: $ </b>{this.props.booking.BoardingRate !=  null ? this.props.booking.BoardingRate : ''}<br></br>
				<b>Collection Day Discount: % </b>{this.props.booking.CollectionDayDiscount}<br></br>
				<b>12hr Discount: % </b>{this.props.booking.HalfDayDiscount}<br></br>
				<b>DayCare Rate: $ </b>{this.props.booking.DayCareRate}<br></br>
				<b>Unit Type Surcharge Rate: $ </b>{this.props.booking.UnitTypeSurcharge}<br></br>
				<b>Peak Period Surcharge: $ </b>{this.props.booking.PeakPeriodSurcharge}<br></br>
				<b>Extended Stay Period: </b>{this.props.booking.ExtendedStayPeriod} Days<br></br>
				<b>Extended Stay Discount: % </b>{this.props.booking.ExtendedStayDiscount}<br></br>
				<b>Linked Booking Discount: % </b>{this.props.booking.LinkedBookingDiscount}<br></br>
			</div>
			<div className = "box" style = {left}>
				<b>Sub Total: $ </b>{this.getSubTotal(booking).toFixed(2)}<br></br>
				<b>Discount: % </b>{!Array.isArray(this.props.booking.Discount) ? '0' : this.props.booking.Discount[0]}<br></br>
				<b>TOTAL: $ </b>{this.getTotal(booking).toFixed(2)}<br></br>
			</div>
			<br></br>
			<h3>Total Charges</h3>
			<div className = "box">
					<b>Net Booking Charges   $</b>{this.getTotal(booking).toFixed(2)}<br></br>
					<b>NY State Tax   $</b>{this.getTax(booking).toFixed(2)}<hr></hr>
					<b>Total To Pay   $</b>{this.getTotalToPay(booking).toFixed(2)}<hr></hr>
					<span style={left}><button onClick = {this.handleSubmit}> Take Payment </button></span>
			</div>
			</div>
			)
		}

	}

	const left = {
		display : "inline-block",
		margin : "10px"
	}
