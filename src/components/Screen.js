// ---------------------------------------- TO DO ----------------------------------------

'use babel';


import React from 'react';
import Home from "./navbar/Home"
import About from "./navbar/About"

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
		else if {
			return(
				<div>
					<Fullprofile animal = {this.props.animal}/>
				</div>
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
