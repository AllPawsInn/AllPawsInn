'use babel';

import React from 'react';


export default class FullProfile extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			animal : this.props.animal
		}

	}

	render() {
		if (this.props.animal)
			return  (
				<div className = "box cal">
					<h3>Animal Details</h3>
					Name: {this.props.animal.AnimalName} <br></br>
					Sex: {this.props.animal.Sex} <br></br>
					Breed: {this.props.animal.Breed} <br></br>
					Color: {this.props.animal.Colour} <br></br>
					Age: {this.props.animal.Age} yrs<br></br>
					Tag Ref: {this.props.animal.TagRef} <br></br>
					Neutered/Spayed: {this.props.animal.NeuteredSpayed ? 'Yes' : 'No'}<br></br>
					ShareKennel: {this.props.animal.ShareKennel} <br></br>
					Bites: {this.props.animal.Bites} <br></br>
					Notes: {this.props.animal.AnimalNotes} <br></br>
					<h4>Food</h4>
					Type A: {this.props.animal.Food1TypeName} <br></br>
					Amount: {this.props.animal.Food1Amount}  Freq: {this.props.animal.Food1Freq} <br></br>
					Type B: {this.props.animal.Food2TypeName} <br></br>
					Amount: {this.props.animal.Food2Amount}  Freq: {this.props.animal.Food2Freq} <br></br>
					Notes: {this.props.animal.FoodNote} <br></br>
					FoodChews: {this.props.animal.FoodChews ? 'Yes' : 'No'}<br></br>
					<h4>Medical</h4>
					Medical Conditions: {this.props.animal.MedicalConditions} <br></br>
				</div>
			);
		else
			return <div className = "box cal"><h3>Animal Details</h3></div>;
	}
}

