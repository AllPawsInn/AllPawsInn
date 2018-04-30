// ---------------------------------------- TO DO ----------------------------------------
'use babel';

import React from 'react';
import Calendar from "./pages/Calendar"
import About from "./pages/About"
import FullProfile from "./animal/FullProfile"
import ClientProfile from "./client/ClientProfile"
import Booking from "./pages/Booking"
import NewBooking from "./pages/NewBooking"
import Report from "./pages/Report"
import Payment from "./payment/Payment"
import Scheduler from "./functions/Scheduler"

export default class Screen extends React.Component {
	componentWillMount() {
		this.setState({
			screen: "home"
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			screen: nextProps.screen
		})
	}

	render() {
		const addDog = this.state.addDog;

		//can use spread operator on some of them in order to pass properties
		if(this.state.screen === "about")
			return <About/>
		else if(this.state.screen === "full_profile")
			return <FullProfile animal = {this.props.animal}/>
		else if(this.state.screen === "client")
			return(<ClientProfile animal = {this.props.animal} updateScreen = {this.props.updateScreen}/>)
		else if(this.state.screen === "payment")
			return(<Payment updateScreen = {this.props.updateScreen} booking = {this.props.booking}/>)
		else if(this.state.screen === "report")
			return(<Report bookings = {this.props.bookings}/>)
		else if(this.state.screen === "scheduler")
			return(<Scheduler dogs = {this.props.bookings}/>)
		else if(this.state.screen === "booking")
			return(<Booking updateScreen = {this.props.updateScreen} id_object = {this.props.id_object} animal = {this.props.animal} bookings = {this.props.bookings}/>)
		else if(this.state.screen === "new_booking")
			return(<NewBooking updateScreen = {this.props.updateScreen} id_object = {this.props.id_object} animal = {this.props.animal} bookings = {this.props.bookings}/>)
		else
			return (<Calendar payment = {this.props.payment} currentId = {this.props.currentId} bookings = {this.props.bookings}/>)

	}
}
