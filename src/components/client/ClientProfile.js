'use babel';

import React from 'react';


export default class ClientProfile extends React.Component {
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
					<h3>Client Details</h3>
					Last Name: {this.props.animal.LastName} <br></br>
					First Name: {this.props.animal.FirstName} Title: {this.props.animal.Title}<br></br>
					Partner Name: {this.props.animal.PartnerName} <br></br>
					Address1: {this.props.animal.Address1} <br></br>
					Address2: {this.props.animal.Address2} <br></br>
					Town/City: {this.props.animal.Address3} <br></br>
					Region/State: {this.props.animal.Region} <br></br>
					Postcode/ZIP: {this.props.animal.PostcodeZIP} Mailings Permitted: {this.props.animal.Mailings ? 'Yes' : 'No'}<br></br>
					Country: {this.props.animal.Country}<br></br>
					Tel (home): {this.props.animal.TelHome}<br></br>
					Tel (work): {this.props.animal.TelWork}<br></br>
					Mobile/Cell: {this.props.animal.CellMobile}<br></br>
					Email: {this.props.animal.Email} <br></br>
					Web Contact: {this.props.animal.WebContact} <br></br>
					Indetification: {this.props.animal.ClientIdent} <br></br>
					Referred By: {this.props.animal.Referred} Discount: {this.props.animal.Discount}<br></br>
					Notes: {this.props.animal.ClientNotes} <br></br>
					<h4>Animals</h4>
					<h4>Veterinary</h4>
				</div>
			);
		else
			return <div className = "box cal"><h3>Client Details</h3></div>;
	}
}

