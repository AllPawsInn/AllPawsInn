const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')

'use babel';

import React from 'react';

export default class Print extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
	      current : this.props.current
	    }
	    this.handlePrintSubmit = this.handlePrintSubmit.bind(this)
	}

	handlePrintSubmit(event){
		window.print()
	 }

	render() {
		let curList = this.props.current
		if (this.props.current)
			return  (
				<div className = "box cal">
					<h1>All Paws Inn</h1>
					<table>
				      <tr>
				        <th className="key">Kennel/Unit Ref:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Client Name:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Animal Name:</th>
				        <th>{}</th>
				      </tr>
				      </table>
				      <br></br>
				      <table>
				      <tr>
				        <th className="key">Animal Type:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Breed:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Color:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Sex:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Age:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Neutered?:</th>
				        <th>{}</th>
				      </tr>
				    </table>
				    <br></br>
				    <table className="right">
				      <tr>
				        <th className="key">Time In:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Time Out:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Booking ID:</th>
				        <th>{}</th>
				      </tr>
				    </table>
				    <table>
				      <tr>
				        <th className="key">Date In:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Date Out:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Type:</th>
				        <th>{}</th>
				      </tr>
				    </table>
				    <br></br>
				    <table>
				      <tr>
				        <th className="key">Emergency:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Vet Surgery:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Vet Tel:</th>
				        <th>{}</th>
				      </tr>
				      <tr>
				        <th className="key">Notes:</th>
				        <th>{}</th>
				      </tr>
    				</table>
					<span className="print"><button className = "profileButton" onClick = {this.handlePrintSubmit}> Print </button></span>
				</div>
			);
		else
			return <div className = "box cal"><h3>Print</h3></div>;
	}
}
