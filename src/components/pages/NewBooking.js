const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')
//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
const booking_lib = require('../../js/bookinglib')

function create_date(datestr,clientID){
	let dt_in = datestr.split('/')
	let buffer = new Date(Date.now())
	buffer.setMonth(dt_in[0] - 1)
	buffer.setDate(dt_in[1])
	buffer.setFullYear(dt_in[2])
	return buffer;

}
async function selectClient(client){
	let pool = await sql.connect(sqlConfig)
	let id='';

	let qr = `select * from ClientDetails where Email = '${client.Email}' and LastName = '${client.LastName}' and Address1 = '${client.Adress}'`
	//if err s
	await pool.request().query(qr)
.then(result => {
	console.dir(result.recordset[0])
	id=result.recordset[0].ClientID;
}).catch(err => {
	// ... error checks
})
	sql.close()
	return id;
}

async function selectAnimalType(animal){
	let pool = await sql.connect(sqlConfig)
	let id='';

	let qr = `select * from AnimalTypes where AnimalTypeID = '2'`
	//if err s
	await pool.request().query(qr)
.then(result => {
	console.dir(result.recordset[0])

}).catch(err => {
	// ... error checks
})
	sql.close()
	return id;
}
async function selectAnimal(animal,clientID){
	let pool = await sql.connect(sqlConfig)
	let id='';
	let qr = `select * from Animals where AnimalName = '${animal.AnimalName}' and ClientID = clientID`
	//if err s
	await pool.request().query(qr)
.then(result => {
	console.dir(result.recordset[0])
	id=result.recordset[0].AnimalID
}).catch(err => {
	// ... error checks
})
	sql.close()
	return id;
}

async function newClient(client){
	let pool = await sql.connect(sqlConfig)
	let qr = `INSERT INTO ClientDetails (FirstName,LastName,Address1,Email,PostcodeZIP,PartnerName,Referred,TelHome,TelWork,VetSurgeryId)
	VALUES ('${client.FirstName}','${client.LastName}','${client.Adress}','${client.Email}','${client.Zip}','${client.PartnerName}','${client.PracticeName}','${client.Contact_home}','${client.Contact_work}','1')`
	//if err s
	await pool.request().query(qr)
	sql.close()
	console.log("client created...")
}
async function newAnimal(animal,clientID){
	let clientid=clientID
	let pool = await sql.connect(sqlConfig)
	let qr = `INSERT INTO Animals (ClientID,TypeID,AnimalName,Breed,Sex)
	VALUES ('${clientID}','2','${animal.AnimalName}','${animal.AnimalBreed}','${animal.AnimalSex}')`
	//if err s
	await pool.request().query(qr)
	sql.close()
	console.log("animal created...")
	return clientid;
}
async function newBooking(animal,animalID){

	let pool = await sql.connect(sqlConfig)
	let qr = `INSERT INTO BookingObjects (AnimalID,KennelID,DateIn,DateOut,Status)
	VALUES ('${animalID}','1345484','2019-02-21T18:10:00', '2019-01-01T00:00:00','CI')`
	//if err s
	await pool.request().query(qr).then(result => {


	}).catch(err => {
		console.dir(err)
	})
	sql.close()
	console.log("reservation created...")
	return animalID;
}
async function getBooking(animal,id){

	let pool = await sql.connect(sqlConfig)
	let qr = `select * from VetDetails`
	//if err s
	await pool.request().query(qr).then(result => {
		console.dir(result)

	}).catch(err => {
		console.log(err)
	})
	sql.close()
}

export default class NewBooking extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id : this.props.id_object
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleSubmit(event){
		event.preventDefault();

		let client_details = {
			FirstName : event.target[0].value,
			LastName : event.target[1].value,
			Adress : event.target[2].value,
			Email : event.target[3].value,
			Zip : event.target[4].value,
			PartnerName : event.target[5].value,
			PracticeName :event.target[6].value,
			Contact_home :event.target[7].value,
			Contact_work :event.target[8].value,
			Allow_mail:event.target[9].value
		}

		// newClient(client_details);


		let animal = {
			AnimalName : event.target[10].value,
			AnimalBreed : event.target[11].value,
			AnimalSex : event.target[12].value,
			KennelUnit : event.target[13].value,
			DateIn : create_date(event.target[14].value),
			DateOut : create_date(event.target[15].value),
		}
// 		selectClient(client_details).then(clientID => {
// 		console.log(clientID)
// 		newAnimal(animal,clientID).then(result =>{
// 			console.log(result)
// 		});
// });


newClient(client_details).then(result => {
	selectClient(client_details).then(id => {
		newAnimal(animal,id).then(clientID =>{
			selectAnimal(animal,clientID).then(id =>{
					newBooking(animal,id).then(id=>{
						getBooking(animal,id)
					})
			})
		})
	})
})


		// let obj = {
		// 	FirstName : event.target[0].value,
		// 	LastName : event.target[1].value,
		// 	animal : event.target[2].value,
		// 	type : event.target[3].value,
		// 	kennel : event.target[4].value,
		// 	DateIn : create_date(event.target[5].value),
		// 	DateOut : create_date(event.target[6].value)
		// }



		//	let num = await pool.request()
			 // .query("SELECT top 1 * from dbo.BookingObjects order by BookingID desc") //client
		//if err sql.close

		//make new client and animal database entry
		//clean this pack up
		// let tmp = booking_lib.create_booking(this.props.animal, obj)
		// tmp.BookingID = this.props.id_object.current_id++
		// this.props.bookings.push(tmp)
		// buffer array until a neat way to put array push /w set state
		this.props.updateScreen("home")

	}

	render(){
		//default date value
		//disabled vs readonly fields
		//default kennel unit?
		//calendar no hour input atm
		return (
			<div className = "box cal">
				<h1>New Booking</h1>
				<form onSubmit = {this.handleSubmit}>
					<br></br>
					<b><h2>Client</h2></b>
					<div className = "box">
						<b>First Name</b><input name = "FirstName" type = "text"/><br></br>
						<b>Last Name</b><input name = "LastName" type = "text"/><br></br>
						<b>Address</b><input name = "Address1"type = "text"/><br></br>
						<b>Email</b><input name = "LastName" type = "text"/><br></br>
						<b>Postcode ZIP</b><input name = "PostcodeZIP" type = "text"/><br></br>
						<b>Partner Name</b><input name = "PartnerName" type = "text"/><br></br>
						<b>Practice Name</b><input name = "PracticeName" type = "text"/><br></br>
						<b>Contact(Home)</b><input name = "TelHome" type = "text"/><br></br>
						<b>Contact(Work)</b><input name = "TelWork" type = "text"/><br></br>
						<b>Allow Mailings</b>
						<select name = "Mailings">
						  <option value = "Yes">Yes</option>
						  <option value = "No">No</option>
					  </select>
					</div>
					<br></br>
					<b><h2>Animal</h2></b>
					<div className = "box">
						<b>Animal Name</b><input name = "animal_name" type = "text"/><br></br>
						<b>Animal Breed</b><input name = "type" type = "text"/><br></br>
						<b>Animal Sex</b><input name = "sex" type = "text"/><br></br>
						<b>Kennel Unit</b> <input name = "kennel_unit" type = "number" value = {1}/><br></br>
						<b>Date In</b><Calendar format='MM/DD/YYYY' date = '3-20-2018'/><br></br>
						<b>Date Out</b><Calendar format='MM/DD/YYYY' date = '3-25-2018'/><br></br>
					</div>
					<br></br>
					<b><h2>Veterinary</h2></b>
					<div className = "box">

					<input type = "Submit" value = "Submit"/>
					</div>


				</form>
			</div>
		)
	}
}
