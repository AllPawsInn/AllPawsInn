// ---------------------------------------- TO DO ----------------------------------------

'use babel';


import React from 'react';
import Home from "./navbar/Home"
import About from "./navbar/About"
import FullProfile from "./animal/FullProfile"

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
		else if(this.state.screen == "full_profile"){
			return(
				<FullProfile animal = {this.props.animal}/>
			)
		}
		else{
			return (
				<div>
					<Home currentId = {this.props.currentId} bookings = {this.props.bookings}/>
				</div>
			)
		}
	}
}
