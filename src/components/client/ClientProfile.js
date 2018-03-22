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
					<br></br>
					<div className = "box">
						<h6>Last Name:</h6> {this.props.animal.LastName} <br></br>
						<h6>First Name:</h6> {this.props.animal.FirstName} Title: {this.props.animal.Title}<br></br>
						<h6>Partner Name:</h6> {this.props.animal.PartnerName} <br></br>
						<h6>Address1:</h6> {!Array.isArray(this.props.animal.Address1) ? this.props.animal.Address1 : this.props.animal.Address1[1]} <br></br>
						<h6>Address2:</h6> {!Array.isArray(this.props.animal.Address2) ? this.props.animal.Address2 : this.props.animal.Address2[1]} <br></br>
						<h6>Town/City:</h6> {this.props.animal.Address3} <br></br>
						<h6>Region/State:</h6> {!Array.isArray(this.props.animal.Region) ? this.props.animal.Region :this.props.animal.Region[1] }<br></br>
						<h6>Postcode/ZIP:</h6> {!Array.isArray(this.props.animal.PostcodeZIP) ? this.props.animal.PostcodeZIP : this.props.animal.PostcodeZIP[1]} Mailings Permitted: {this.props.animal.Mailings ? 'Yes' : 'No'}<br></br>
						<h6>Country:</h6> {this.props.animal.Country}<br></br>
						<h6>Tel (home):</h6> {this.props.animal.TelHome}<br></br>
						<h6>Tel (work):</h6> {this.props.animal.TelWork}<br></br>
						<h6>Mobile/Cell:</h6> {this.props.animal.CellMobile}<br></br>
						<h6>Email:</h6> {!Array.isArray(this.props.animal.Email) ? this.props.animal.Email : this.props.animal.Email[1]} <br></br>
						<h6>Web Contact:</h6> {this.props.animal.WebContact} <br></br>
						<h6>Indetification:</h6> {this.props.animal.ClientIdent} <br></br>
						<h6>Referred By:</h6> {this.props.animal.Referred} Discount: {this.props.animal.Discount}<br></br>
						<h6>Notes:</h6> {this.props.animal.ClientNotes} <br></br>
					</div>
					<br></br>
					<div className = "box">
						<h4>Animals</h4>
					</div>
					<br></br>
					<div className = "box">
						<h4>Veterinary</h4>
						<h6>Surgery:</h6> {this.props.animal.PracticeName} <br></br>
						<h6>Vet Name:</h6> {this.props.animal.VetName} <br></br>
						<h6>Address1:</h6> {!Array.isArray(this.props.animal.Address1) ? '' : this.props.animal.Address1[0]} <br></br>
						<h6>Address2:</h6> {!Array.isArray(this.props.animal.Address2) ? '' : this.props.animal.Address2[0]} <br></br>
						<h6>Town/City:</h6> {this.props.animal.Town} <br></br>
						<h6>Region/State:</h6> {!Array.isArray(this.props.animal.Region) ? '' :this.props.animal.Region[0] }<br></br>
						<h6>Postcode/ZIP:</h6> {!Array.isArray(this.props.animal.PostcodeZIP) ? '' : this.props.animal.PostcodeZIP[0]}<br></br>
						<h6>Email:</h6> {!Array.isArray(this.props.animal.Email) ? '' : this.props.animal.Email[0]} <br></br>
					</div>
				</div>
			);
		else
			return <div className = "box cal"><h3>Client Details</h3></div>;
	}
}

