// ---------------------------------------- TO DO ----------------------------------------

'use babel';


import React from 'react';
import Home from "./navbar/Home"
import About from "./navbar/About"
import FullProfile from "./animal/FullProfile"
import ClientProfile from "./client/ClientProfile"
import NewBooking from "./NewBooking"
import Report from "./navbar/Report"
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

		if(this.state.screen == "about")
			return <About/>
		else if(this.state.screen == "full_profile")
			return <FullProfile animal = {this.props.animal}/>
		else if(this.state.screen == "client")
			return(<ClientProfile animal = {this.props.animal}/>)
		else if(this.state.screen == "payment")
			return(<Payment booking = {this.props.booking}/>)
		else if(this.state.screen == "report"){
			return(<Report bookings = {this.props.bookings}/>)
		}
		else if(this.state.screen == "scheduler"){
	return(
	<Scheduler dogs = {this.props.dogs}/>
)
}
		else if(this.state.screen == "new_booking")
			return(<NewBooking id_object = {this.props.id_object} animal = {this.props.animal} bookings = {this.props.bookings}/>)
		else
			return (<Home payment = {this.props.payment} currentId = {this.props.currentId} bookings = {this.props.bookings}/>)

	}
}
