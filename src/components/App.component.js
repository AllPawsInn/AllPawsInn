// ---------------------------------------- TO DO ----------------------------------------
// -- Calendar shouldnt re-render on search

'use babel';

import React from 'react'
import ReactDOM  from 'react-dom'
import Navbar from './Navbar'
import Screen from './Screen'
import Sidescreen from './Sidescreen'

const sqlConfig = require('./sqlconfig')
const sql = require('mssql')


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
		this.full_profile = this.full_profile.bind(this)
		this.full_profile = this.full_profile.bind(this)
		this.get_client = this.get_client.bind(this)
		this.get_payment = this.get_payment.bind(this)
	}

	async grabDogs(){

		// insert => "INSERT INTO dbo.Colours (ColourName) VALUES ('Blue')"
		// delete => "DELETE FROM [KMDB].[dbo].[BookingObjects] where BookingID > 16805"
		// select => "SELECT * FROM dbo.Animals"

		//catch errors in this block
		let pool = await sql.connect(sqlConfig)
		let t = Date.now()
		let result = await pool.request()
			 .query("SELECT * from dbo.Animals, dbo.VetDetails, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.ClientDetails.VetSurgeryId = dbo.VetDetails.ID")
		//if err sql.close


		// "SELECT top 1 * from dbo.BookingObjects order by BookingID desc" // returns most recently assigned ID

		let y = Date.now()
		let bookings = await pool.request()
			 .query("SELECT * from dbo.BookingObjects ,dbo.VetDetails, dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.Animals.AnimalID =  dbo.BookingObjects.AnimalID and dbo.ClientDetails.VetSurgeryId = dbo.VetDetails.ID and dbo.BookingObjects.DateOut > '2017-07-06 12:00:00.000'")
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
		this.setState({
			animal : animal,
			screen : "new_booking"
		}) //simple value
	}

	full_profile(animal){
		this.setState({
			animal : animal,
			screen : "full_profile"
		})
	}

	get_client(animal){
		this.setState({
			animal : animal,
			screen : "client"
		})
	}

	get_payment(booking){
		this.setState({
			payBooking : booking,
			screen : "payment"
		})
	}

	render(){
		return(
			<div style={{backgroundColor: "#D3D3D3"}}>
				<Navbar updateScreen = {this.updateScreen} side = {this.toggle_side} dogs = {this.state.dog_list}/>
				<div className='wrapper'>
					<Screen payment = {this.get_payment} booking = {this.state.payBooking} id_object = {this.state.booking} animal = {this.state.animal} screen = {this.state.screen} dogs = {this.state.dog_list} bookings = {this.state.booking_list} currentId = {this.state.booking}/>
					<Sidescreen update_screen = {this.update_screen} client = {this.get_client} profile = {this.full_profile} proc = {this.grab_animal} dogs = {this.state.dog_list} query = {this.state.query} side = {this.toggle_side_off} sidescreen = {this.state.sidescreen}/>
				</div>
			</div>
		);
	}

}