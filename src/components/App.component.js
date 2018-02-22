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

function toDatetime(date){
	let formatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
	return formatted
}
// let query = 'INSERT INTO BookingObjects (AnimalID, KennelID, DateIn, DateOut, Status) VALUES (' + new_booking.animal + ', ' + new_booking.kennel_id + ', ' + new_booking.date_in + ', ' + new_booking.date_out + ', ' + new_booking.status
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

	let new_booking = {
		animal_id : animal.AnimalID,
		kennel_id : 20, //user prompted in the future
		date_in : dateNow(),
		date_out : dateOut(),
		status : "NCI"
	}
	console.log(`INSERT INTO BookingObjects (AnimalID, KennelID, DateIn, DateOut, Status) VALUES (${new_booking.animal_id}, ${new_booking.kennel_id}, ${new_booking.date_in}, ${new_booking.date_out}, ${new_booking.status})`)
	let pool = await sql.connect(sqlConfig)
	let result = await pool.request()
		.query(`INSERT INTO BookingObjects (AnimalID, KennelID, DateIn, DateOut, Status) VALUES (${new_booking.animal_id}, ${new_booking.kennel_id}, '${new_booking.date_in}', '${new_booking.date_out}', '${new_booking.status}')`)

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
		// delete => "DELETE FROM dbo.Animals WHERE ID = 16"
		// select => "SELECT * FROM dbo.Animals"

		let pool = await sql.connect(sqlConfig)
		let t = Date.now()
		let result = await pool.request()
			 .query("SELECT * from dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID")
		console.log((Date.now() - t))

		// "SELECT top 1 * from dbo.BookingObjects order by BookingID desc"
		let y = Date.now()
		let bookings = await pool.request()
				 .query("SELECT * from dbo.BookingObjects ,dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.Animals.AnimalID =  dbo.BookingObjects.AnimalID and dbo.BookingObjects.DateOut > '2017-07-06 12:00:00.000'")
			console.log((Date.now() - y ))

			let num = await pool.request()
				 .query("SELECT top 1 * from dbo.BookingObjects order by BookingID desc")

			console.log(num)
		sql.close()

		this.setState({
			dog_list : result.recordset,
			booking : {current_id : num.recordset[0].BookingID},
			// booking_list : bookings.recordset
		})

		console.log(this.state.booking_list)
		console.log(this.state.booking.current_id)
		console.log(bookings.recordset)   
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
		tmp.BookingId = this.state.booking.current_id
		this.state.booking_list.push(tmp)
		//create a booking here
		animal.BookingId = this.state.booking.current_id

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
						<Screen screen = {this.state.screen} dogs = {this.state.dog_list}/>
					</div>
				</div>
			);
		}
	}
}