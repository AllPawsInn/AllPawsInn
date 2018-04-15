'use babel';

import React from 'react';

export default class ClientProfile extends React.Component {
	render() {
		if (this.props.animal)
			return  (
				<div className = "box cal">
					<h3>Client Details</h3>
					<br></br>
					<div className = "box">
						<h6>Last Name:</h6> {this.props.animal[0].LastName} <br></br>
						<h6>First Name:</h6> {this.props.animal[0].FirstName} Title: {this.props.animal[0].Title}<br></br>
						<h6>Partner Name:</h6> {this.props.animal[0].PartnerName} <br></br>
						<h6>Address1:</h6> {!Array.isArray(this.props.animal[0].Address1) ? this.props.animal[0].Address1 : this.props.animal[0].Address1[1]} <br></br>
						<h6>Address2:</h6> {!Array.isArray(this.props.animal[0].Address2) ? this.props.animal[0].Address2 : this.props.animal[0].Address2[1]} <br></br>
						<h6>Town/City:</h6> {this.props.animal[0].Address3} <br></br>
						<h6>Region/State:</h6> {!Array.isArray(this.props.animal[0].Region) ? this.props.animal[0].Region :this.props.animal[0].Region[1] }<br></br>
						<h6>Postcode/ZIP:</h6> {!Array.isArray(this.props.animal[0].PostcodeZIP) ? this.props.animal[0].PostcodeZIP : this.props.animal[0].PostcodeZIP[1]} Mailings Permitted: {this.props.animal[0].Mailings ? 'Yes' : 'No'}<br></br>
						<h6>Country:</h6> {this.props.animal[0].Country}<br></br>
						<h6>Tel (home):</h6> {this.props.animal[0].TelHome}<br></br>
						<h6>Tel (work):</h6> {this.props.animal[0].TelWork}<br></br>
						<h6>Mobile/Cell:</h6> {this.props.animal[0].CellMobile}<br></br>
						<h6>Email:</h6> {!Array.isArray(this.props.animal[0].Email) ? this.props.animal[0].Email : this.props.animal[0].Email[1]} <br></br>
						<h6>Web Contact:</h6> {this.props.animal[0].WebContact} <br></br>
						<h6>Indetification:</h6> {this.props.animal[0].ClientIdent} <br></br>
						<h6>Referred By:</h6> {this.props.animal[0].Referred} Discount: {this.props.animal[0].Discount}<br></br>
						<h6>Notes:</h6> {this.props.animal[0].ClientNotes} <br></br>
					</div>
					<br></br>
					<div className = "box">
						<h4>Animals</h4>
					</div>
					<br></br>
					<div className = "box">
						<h4>Veterinary</h4>
						<h6>Surgery:</h6> {this.props.animal[0].PracticeName} <br></br>
						<h6>Vet Name:</h6> {this.props.animal[0].VetName} <br></br>
						<h6>Address1:</h6> {!Array.isArray(this.props.animal[0].Address1) ? '' : this.props.animal[0].Address1[0]} <br></br>
						<h6>Address2:</h6> {!Array.isArray(this.props.animal[0].Address2) ? '' : this.props.animal[0].Address2[0]} <br></br>
						<h6>Town/City:</h6> {this.props.animal[0].Town} <br></br>
						<h6>Region/State:</h6> {!Array.isArray(this.props.animal[0].Region) ? '' :this.props.animal[0].Region[0] }<br></br>
						<h6>Postcode/ZIP:</h6> {!Array.isArray(this.props.animal[0].PostcodeZIP) ? '' : this.props.animal[0].PostcodeZIP[0]}<br></br>
						<h6>Email:</h6> {!Array.isArray(this.props.animal[0].Email) ? '' : this.props.animal[0].Email[0]} <br></br>
					</div>
				</div>
			);
		else
			return <div className = "box cal"><h3>Client Details</h3></div>;
	}
}

