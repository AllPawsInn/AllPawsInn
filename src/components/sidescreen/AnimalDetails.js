'use babel';

import React from 'react';

export default class AnimalDetails extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			animal : this.props.animal
		}

		this.get_profile = this.get_profile.bind(this)
	}

	get_profile(){
		this.props.proc(this.props.animal)
	}

	get_fullprofile(){
		this.props.prof(this.props.animal)
	}
	
	render() {
		if (this.props.animal)
			return  (
				<div className = "box animalDet">
					<h3>Animal Details</h3>
					Animal Name: {this.props.animal.AnimalName} <br></br>
					Breed: {this.props.animal.Breed} <br></br>
					Sex: {this.props.animal.Sex} <br></br>
					Age: {this.props.animal.Age} <br></br>
					Bites: {this.props.animal.Bites} <br></br>
					ShareKennel: {this.props.animal.ShareKennel} <br></br>
					<button onClick = {this.prof} >Full Profile</button>
					<button onClick = {this.get_profile}>New Reservation</button>
					<button>Client Profile</button>
				</div>
			);
		else
			return <div className = "box animalDet"><h3>Animal Details</h3></div>;
	}
}
