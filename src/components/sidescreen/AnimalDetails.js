'use babel';

import React from 'react';

export default class AnimalDetails extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			animal : this.props.animal
		}

		this.get_profile = this.get_profile.bind(this)
		this.get_fullprofile = this.get_fullprofile.bind(this)
		this.get_client = this.get_client.bind(this)
	}

	get_profile(){
		this.props.proc(this.props.animal)
	}

	get_fullprofile(){
		this.props.profile(this.props.animal)
	}

	get_client(){
		this.props.client(this.props.animal)
	}

	render() {
		if (this.props.animal)
			return  (
				<div className = "box animalDet">
					<h3>Animal Details</h3>
					Animal Name: <b>{this.props.animal.AnimalName}</b> <br></br>
					Client Name: <b>{this.props.animal.FirstName} {this.props.animal.LastName}</b> <br></br>
					Breed: <b>{this.props.animal.Breed}</b> <br></br>
					Sex: <b>{this.props.animal.Sex}</b> <br></br>
					Age: <b>{this.props.animal.Age}</b> <br></br><br></br>
					<div className = "profileButtonPanel">
						<button className = "profileButton" onClick = {this.get_profile}>New Reservation</button>
					</div><br></br>
					<div className = "profileButtonPanel">
						<button className = "profileButton" onClick = {this.get_fullprofile}>Full Profile</button>
						<button className = "profileButton" onClick = {this.get_client}>Client Profile</button>
					</div>
				</div>
			);
		else
			return <div className = "box animalDet"><h3>Animal Details</h3></div>;
	}
}
