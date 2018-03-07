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
					{console.log(this.props.animal)}
					Partner Name: {this.props.animal.PartnerName} <br></br>
					Address1: {!Array.isArray(this.props.animal.Address1) ? this.props.animal.Address1 : this.props.animal.Address1[1]} <br></br>
					Address2: {!Array.isArray(this.props.animal.Address2) ? this.props.animal.Address2 : this.props.animal.Address2[1]} <br></br>
					Town/City: {this.props.animal.Address3} <br></br>
					Region/State: {!Array.isArray(this.props.animal.Region) ? this.props.animal.Region :this.props.animal.Region[1] }<br></br>
					Postcode/ZIP: {!Array.isArray(this.props.animal.PostcodeZIP) ? this.props.animal.PostcodeZIP : this.props.animal.PostcodeZIP[1]} Mailings Permitted: {this.props.animal.Mailings ? 'Yes' : 'No'}<br></br>
					Country: {this.props.animal.Country}<br></br>
					Tel (home): {this.props.animal.TelHome}<br></br>
					Tel (work): {this.props.animal.TelWork}<br></br>
					Mobile/Cell: {this.props.animal.CellMobile}<br></br>
					Email: {!Array.isArray(this.props.animal.Email) ? this.props.animal.Email : this.props.animal.Email[1]} <br></br>
					Web Contact: {this.props.animal.WebContact} <br></br>
					Indetification: {this.props.animal.ClientIdent} <br></br>
					Referred By: {this.props.animal.Referred} Discount: {this.props.animal.Discount}<br></br>
					Notes: {this.props.animal.ClientNotes} <br></br>
					<h4>Animals</h4>
					<h4>Veterinary</h4>
					Surgery: {this.props.animal.PracticeName} <br></br>
					Vet Name: {this.props.animal.VetName} <br></br>
					Address1: {!Array.isArray(this.props.animal.Address1) ? '' : this.props.animal.Address1[0]} <br></br>
					Address2: {!Array.isArray(this.props.animal.Address2) ? '' : this.props.animal.Address2[0]} <br></br>
					Town/City: {this.props.animal.Town} <br></br>
					Region/State: {!Array.isArray(this.props.animal.Region) ? '' :this.props.animal.Region[0] }<br></br>
					Postcode/ZIP: {!Array.isArray(this.props.animal.PostcodeZIP) ? '' : this.props.animal.PostcodeZIP[0]}<br></br>
					Email: {!Array.isArray(this.props.animal.Email) ? '' : this.props.animal.Email[0]} <br></br>
				</div>
			);
		else
			return <div className = "box cal"><h3>Client Details</h3></div>;
	}
}

