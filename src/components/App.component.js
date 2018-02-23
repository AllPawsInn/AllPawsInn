'use babel';

import React from 'react'
import ReactDOM  from 'react-dom'
import Navbar from './Navbar'
import Screen from './Screen'
import Sidescreen from './Sidescreen'

const sql = require('mssql')

let sqlConfig = {
	user: 'admin', // your mssql account	
	password: 'alisan12',
	server: 'DESKTOP-RA1SLRQ', // your server name
	database: 'KMDB'
}

function sqlParse(val){ //sql requires date values to be in 02-07-2018 rather than 2-7-2017
	if (val < 10)
		return '0' + val
	else 
		return val
}

function toDatetime(date){

	let formatted = `${date.getFullYear()}-${sqlParse(date.getMonth() + 1)}-${sqlParse(date.getDate())}T${sqlParse(date.getHours())}:${sqlParse(date.getMinutes())}:${sqlParse(date.getSeconds())}`
	return formatted
}

function dateNow(){
	let dt = new Date ()
	return toDatetime(dt)
}

function dateOut(epoch){
	//use an epoch converter to build the check out date
	//epoch is to supposed to be the appointment duration
	let dt = new Date (Date.now() + 604800000)
	return toDatetime(dt)
}

async function create_booking(animal){

	//push animal's and client's properties to booking
	let new_booking = {
		animal_id : animal.AnimalID,
		kennel_id : 20, //user prompted in the future
		DateIn : dateNow().toString(),
		DateOut : dateOut().toString(),
		status : "NCI"
	}

	let pool = await sql.connect(sqlConfig)
	let result = await pool.request()
		.query(`INSERT INTO BookingObjects (AnimalID, KennelID, DateIn, DateOut, Status) VALUES (${new_booking.animal_id}, ${new_booking.kennel_id}, '${new_booking.DateIn}', '${new_booking.DateOut}', '${new_booking.status}')`)
		//if err sql.close

	sql.close()
	return new_booking
}


export default class Main extends React.Component {
	constructor(props) {
		super(props) 
		this.state = {
			dog_list : [],
			booking_list : [],
		}
	this.grabDogs()
	}

	componentWillMount(){
		this.setState({
			screen : "",
			sidescreen : false,
			query : ""
		})
		this.updateScreen = this.updateScreen.bind(this)
		this.toggle_side = this.toggle_side.bind(this)
		this.toggle_side_off = this.toggle_side_off.bind(this)
		this.grab_animal = this.grab_animal.bind(this)
	}

	async grabDogs(){
		
		// insert => "INSERT INTO dbo.Colours (ColourName) VALUES ('Blue')"
		// delete => "DELETE FROM [KMDB].[dbo].[BookingObjects] where BookingID > 16805"
		// select => "SELECT * FROM dbo.Animals"

		//catch errors in this block
		let pool = await sql.connect(sqlConfig)
		let t = Date.now()
		let result = await pool.request()
			 .query("SELECT * from dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID")
		//if err sql.close


		// "SELECT top 1 * from dbo.BookingObjects order by BookingID desc" // returns most recently assigned ID

		let y = Date.now()
		let bookings = await pool.request()
			 .query("SELECT * from dbo.BookingObjects ,dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.Animals.AnimalID =  dbo.BookingObjects.AnimalID and dbo.BookingObjects.DateOut > '2017-07-06 12:00:00.000'")
		//if err sql.close


		let num = await pool.request()
			 .query("SELECT top 1 * from dbo.BookingObjects order by BookingID desc")
		//if err sql.close

		sql.close()

		this.setState({
			dog_list : result.recordset,
			booking : {current_id : num.recordset[0].BookingID},
			booking_list : bookings.recordset
		})

	}

	updateScreen(new_screen){
		this.setState({
			screen : new_screen
		})
	}

	toggle_side(query){
		this.setState({
			sidescreen : true,
			query: query
		})
	}

	toggle_side_off(){
		this.setState({
			sidescreen : false
		})
	}

	grab_animal(animal){
		//increment booking id
		this.state.booking.current_id++

		let tmp = create_booking(animal)
		tmp.BookingID = this.state.booking.current_id
		this.state.booking_list.push(tmp)
		//create a booking here
		animal.BookingID = this.state.booking.current_id

		//buffer array until a neat way to put array push /w set state 
		let bookings = this.state.booking_list

		this.setState({ 
			booking_list : bookings
		}) //simple value
	}

	render(){
		if (this.state.sidescreen){
			return(
				<div>
					<Navbar updateScreen = {this.updateScreen} side = {this.toggle_side} dogs = {this.state.dog_list}/>
					<div className = "wrapper">
						<Screen screen = {this.state.screen} dogs = {this.state.dog_list} bookings = {this.state.booking_list} currentId = {this.state.booking}/>
						<Sidescreen proc = {this.grab_animal} dogs = {this.state.dog_list} query = {this.state.query} side = {this.toggle_side_off}/>
					</div>
				</div>
			);
		}

		else{
			return(
				<div>
					<Navbar updateScreen = {this.updateScreen} side = {this.toggle_side} dogs = {this.state.dog_list}/>
					<div className = "wrapper">
						<Screen screen = {this.state.screen} dogs = {this.state.dog_list} bookings = {this.state.booking_list} currentId = {this.state.booking}/>
					</div>
				</div>
			);
		}
	}
}