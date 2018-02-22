// ---------------------------------------- TO DO ----------------------------------------

'use babel';


import React from 'react';
import Home from "./navbar/Home"
import About from "./navbar/About"

export default class Screen extends React.Component {
		constructor(props) {
				super(props)
				let a = 3
				let b = `${a}`
		}

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

				if(this.state.screen == "about"){
						return <About/>
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
