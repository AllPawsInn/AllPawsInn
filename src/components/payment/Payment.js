'use babel';

import React from 'react';



export default class Payment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render(){
		//this.state.id = this.props.id_object

		//increment booking id
		//this.state.id.current_id++

		//let tmp = create_booking(this.props.animal)
		//tmp.BookingID = this.state.id.current_id
		//this.props.bookings.push(tmp)
		//create a booking here
		// animal.BookingID = this.state.id.current_id //questionable?

		//buffer array until a neat way to put array push /w set state
		// let bookings = this.state.booking_list

		return (
			<div>
				<h1>Payment</h1>
			</div>
			)
	}

}