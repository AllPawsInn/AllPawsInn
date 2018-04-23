// ---------------------------------------- TO DO ----------------------------------------

'use babel';

import React from 'react';

async function updateStatusQuery(bookingObject){
	const sqlConfig = require('../../../js/sqlconfig')
	const sql = require('mssql')
	let pool = await sql.connect(sqlConfig)

	let stat = bookingObject.Status
	let bookingId = parseInt(bookingObject.BookingID)

	let queryString = "UPDATE dbo.BookingObjects SET dbo.BookingObjects.Status = '" + stat + "' WHERE dbo.BookingObjects.BookingID = " + bookingId

	let result = await pool.request()
		 .query(queryString)

	sql.close()
}

function parseDate(date){
	return date.toString().split('GMT')[0]
}

export default class List extends React.Component {
	constructor(props){
		super(props)
		this.getStatus = this.getStatus.bind(this)
		this.getNextAction = this.getNextAction.bind(this)
		this.changeState = this.changeState.bind(this)
	}

	changeState(obj){

		// NCO - Not Checked Out
		// NCI - Not Checked In
		// CO - Checked Out
		// CI - Checked In
		let status = '';

		if(obj.Status == "NCI")
			status = "CI"
		else{
			if(obj.Status == "CI")
				status = "CO"
			else if(obj.Status == "NCO")
				status = "CO"
			else
				status = "CO"

			this.props.payment(obj)
		}

		obj.Status = status

		updateStatusQuery(obj)

		this.setState({
			val : 1 //dummy
		})
	}

	getStatus(booking){
		if(booking.Status == "NCI")
			return "Not Checked-In"
		else if(booking.Status == "CI")
			return "Checked-In"
		else if(booking.Status == "NCO")
			return "Not Checked-Out"
		else
			return "Checked-Out"
	}

	getNextAction(booking){
		if(booking.Status == "NCI")
			return "Check-In"
		else if(booking.Status == "CI")
			return "Check-Out"
		else if(booking.Status == "NCO")
			return "Check-Out"
		else
			return "Check-Out"
	}

	render(){
		let curList = this.props.current.sort(function(a,b){return a.DateIn < b.DateIn})
		// TODO: Add first-to-last & last-to-first switch
		return(
			<div>
				<table className = "table table-hover" style={{marginTop: '20px'}}>
					<thead>
						<tr>
							<th style={{width: '10%'}}>Dog Name</th>
							<th style={{width: '20%'}}>Client Name</th>
							<th style={{width: '23%'}}>Date In</th>
							<th style={{width: '23%'}}>Date Out</th>
							<th style={{width: '24%'}}>Status</th>
						</tr>
					</thead>
					<tbody>
					{
					curList.map(obj => //arrow function instead
						<tr style={{height: '50px'}} key = {obj.BookingID}>
								<td>{obj.AnimalName}</td>
								<td>{obj.FirstName} {obj.LastName}</td>
								<td>{parseDate(obj.DateIn)}</td>
								<td>{parseDate(obj.DateOut)}</td>
								<td><span style = {this.getStatus(obj) == ('Checked-Out') ? coStyle : this.getStatus(obj) == ('Checked-In') ? ciStyle : notStyle}><b>{this.getStatus(obj)}</b></span>
								{this.getStatus(obj) == ('Checked-Out') ? '' : <button style={{right:'0px'}} className = "profileButton" onClick ={() => {this.changeState(obj)}}> {this.getNextAction(obj)} </button> }</td>
						</tr>
						)
					}
					</tbody>
				</table>
			</div>
		)
	}
}

const coStyle = {
	color : "green",
	paddingRight : 10
}

const notStyle = {
	color : "red",
	paddingRight : 10
}

const ciStyle = {
	color : "#CCCC00",
	paddingRight : 10
}