const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')
//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
const booking_lib = require('../../js/bookinglib')

async function updateClient(client){
	let pool = await sql.connect(sqlConfig)
	let qr = `UPDATE dbo.ClientDetails SET dbo.ClientDetails.LastName = '${client.LastName}', dbo.ClientDetails.FirstName = '${client.FirstName}', dbo.ClientDetails.PartnerName = '${client.PartnerName}',
	dbo.ClientDetails.Address1 = '${client.Address1}',dbo.ClientDetails.Address3 ='${client.Town}', dbo.ClientDetails.Region ='${client.Region}', dbo.ClientDetails.PostcodeZIP ='${client.Postcode}',
	dbo.ClientDetails.Country ='${client.Country}', dbo.ClientDetails.TelHome ='${client.Tel_home}', dbo.ClientDetails.CellMobile ='${client.Mobile}', dbo.ClientDetails.Email ='${client.Email}',
	dbo.ClientDetails.WebContact ='${client.Web}', dbo.ClientDetails.ClientIdent ='${client.Indetification}', dbo.ClientDetails.Referred ='${client.Referred}', dbo.ClientDetails.Discount ='${client.Discount}',
	dbo.ClientDetails.ClientNotes ='${client.Notes}'
 	WHERE dbo.ClientDetails.ClientID = '${client.ClientID}'`
	//if err s
	await pool.request().query(qr)
	sql.close()
	console.dir("client updated...")
}

export default class ClientProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			animal : this.props.animal
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleSubmit(event){
		event.preventDefault();
		let client_details = {
			ClientID : this.props.animal[0].ClientID[0],
			LastName : event.target[0].value,
			FirstName : event.target[1].value,
			PartnerName : event.target[2].value,
			Address1 : event.target[3].value,
			Town : event.target[4].value,
			Region :event.target[5].value,
			Postcode :event.target[6].value,
			Country:event.target[7].value,
			Tel_home:event.target[8].value,
			Mobile:event.target[9].value,
			Email:event.target[10].value,
			Web:event.target[11].value,
			Indetification:event.target[12].value,
			Referred:event.target[13].value,
			Discount:event.target[14].value,
			Notes:event.target[15].value,
		}

		updateClient(client_details);
		this.props.updateScreen("home")


	}
	render() {
		if (this.props.animal)
			return  (

				<div className = "box cal">
				<form onSubmit = {this.handleSubmit}>
					<h3>Client Details</h3>
					<br></br>
					<div className = "box">
						<div className="row">
							<div className="col-sm-4"><h6>Last Name:</h6> {this.props.animal[0].LastName}</div>
							<div className="col-sm-8"><input name = "LastName" type = "text" placeholder = "Edit LastName" defaultValue = {this.props.animal[0].LastName}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>First Name:</h6> {this.props.animal[0].FirstName} Title: {this.props.animal[0].Title}</div>
							<div className="col-sm-8"><input name = "FirstName" type = "text" placeholder = "Edit FirstName" defaultValue = {this.props.animal[0].FirstName}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Partner Name:</h6> {this.props.animal[0].PartnerName}</div>
							<div className="col-sm-8"><input name = "PartnerName" type = "text" placeholder = "Edit PartnerName" defaultValue = {this.props.animal[0].PartnerName}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4">	<h6>Address1:</h6> {!Array.isArray(this.props.animal[0].Address1) ? this.props.animal[0].Address1 : this.props.animal[0].Address1[1]} <br></br></div>
							<div className="col-sm-8"><input name = "Address" type = "text" placeholder = "Edit Address" defaultValue = {this.props.animal[0].Address1} /></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Town/City:</h6> {this.props.animal[0].Address3} <br></br></div>
							<div className="col-sm-8"><input name = "Town" type = "text" placeholder = "Edit City" defaultValue = {this.props.animal[0].Address3}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Region/State:</h6> {!Array.isArray(this.props.animal[0].Region) ? this.props.animal[0].Region :this.props.animal[0].Region[1] }</div>
							<div className="col-sm-8"><input name = "Region" type = "text" placeholder = "Edit State" defaultValue = {this.props.animal[0].Region}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>PostcodeZIP:</h6>{!Array.isArray(this.props.animal[0].PostcodeZIP) ? this.props.animal[0].PostcodeZIP : this.props.animal[0].PostcodeZIP[1]} Mailings Permitted: {this.props.animal[0].Mailings ? 'Yes' : 'No'}</div>
							<div className="col-sm-8"><input name = "PostcodeZIP" type = "text" placeholder = "Edit PostcodeZIP" defaultValue = {this.props.animal[0].PostcodeZIP}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Country:</h6> {this.props.animal[0].Country}</div>
							<div className="col-sm-8"><input name = "Country" type = "text" placeholder = "Edit Country" defaultValue = {this.props.animal[0].Country}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Tel (home):</h6> {this.props.animal[0].TelHome}</div>
							<div className="col-sm-8"><input name = "Tel_home" type = "text" placeholder = "Edit Tel(home)" defaultValue = {this.props.animal[0].TelHome}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Mobile/Cell:</h6> {this.props.animal[0].CellMobile}</div>
							<div className="col-sm-8"><input name = "Mobile" type = "text" placeholder = "Edit Mobile" defaultValue = {this.props.animal[0].CellMobile}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Email:</h6> {!Array.isArray(this.props.animal[0].Email) ? this.props.animal[0].Email : this.props.animal[0].Email[1]}</div>
							<div className="col-sm-8"><input name = "Email" type = "text" placeholder = "Edit Email" defaultValue = {this.props.animal[0].Email}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Web Contact:</h6> {this.props.animal[0].WebContact} </div>
							<div className="col-sm-8"><input name = "Web" type = "text" placeholder = "Edit WebContact" defaultValue = {this.props.animal[0].WebContact}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Indetification:</h6> {this.props.animal[0].ClientIdent} </div>
							<div className="col-sm-8"><input name = "Indetification" type = "text" placeholder = "Edit Indetification" defaultValue = {this.props.animal[0].ClientIdent}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Referred By:</h6> {this.props.animal[0].Referred} </div>
							<div className="col-sm-8"><input name = "Referred" type = "text" placeholder = "Edit Referred" defaultValue = {this.props.animal[0].Referred}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4">Discount: {this.props.animal[0].Discount}</div>
							<div className="col-sm-8"><input name = "Discount" type = "text" placeholder = "Edit Discount" defaultValue = {this.props.animal[0].Discount}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Notes:</h6> {this.props.animal[0].ClientNotes} </div>
							<div className="col-sm-8"><input name = "Notes" type = "text" placeholder = "Edit Notes" defaultValue = {this.props.animal[0].ClientNotes}/></div>
						</div><br></br>
						<div className="row">
						<div id="editInput">
							<div className="col-sm-4"><input className = "profileButton" type = "Submit" value = "Submit"/> </div>
						</div>
						</div><br></br>

					</div>
					</form>
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
