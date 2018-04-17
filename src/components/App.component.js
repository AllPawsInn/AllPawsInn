// ---------------------------------------- TO DO ----------------------------------------
// -- Calendar shouldnt re-render on search
// -- Prevent default for input fields including and especially search box
'use babel';

import React from 'react'
import ReactDOM  from 'react-dom'
import Navbar from './Navbar'
import Screen from './Screen'
import Sidescreen from './Sidescreen'

const sqlConfig = require('../js/sqlconfig')
const sql = require('mssql')
const booking_lib = require('../js/bookinglib')

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
		this.get_daycare = this.get_daycare.bind(this)
	}

	async grabDogs(){

		// insert => "INSERT INTO dbo.Colours (ColourName) VALUES ('Blue')"
		// delete => "DELETE FROM [KMDB].[dbo].[BookingObjects] where BookingID > 16805"
		// select => "SELECT * FROM dbo.Animals"

		// catch errors in this block
		// fill out empty id's before pushing the sql
		let pool = await sql.connect(sqlConfig)
		let result = await pool.request()
			 .query("SELECT * from dbo.Animals, dbo.VetDetails, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.ClientDetails.VetSurgeryId = dbo.VetDetails.ID")
		//if err sql.close
		// "SELECT top 1 * from dbo.BookingObjects order by BookingID desc" // returns most recently assigned ID
		let bookings = await pool.request()
			 .query("SELECT * from dbo.BookingObjects ,dbo.VetDetails, dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.Animals.AnimalID =  dbo.BookingObjects.AnimalID and dbo.ClientDetails.VetSurgeryId = dbo.VetDetails.ID and dbo.BookingObjects.DateOut > '2017-07-06 12:00:00.000'")
		//if err sql.close
		let num = await pool.request()
			 .query("SELECT top 1 * from dbo.BookingObjects order by BookingID desc")

		let client = await pool.request()
			 .query("SELECT top 1 * from dbo.ClientDetails order by ClientID desc")

		let animal = await pool.request()
			 .query("SELECT top 1 * from dbo.Animals order by AnimalID desc")
		//if err sql.close

		sql.close()

		this.setState({
			dog_list : result.recordset,
			id_object : {
				booking_id : num.recordset[0].BookingID,
				client_id : client.recordset[0].ClientID,
				animal_id : animal.recordset[0].AnimalID
			},
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
			screen : "booking"
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

	get_daycare(animal){
		this.state.id_object.booking_id++
		let sql_obj = {
			DayCare : 1,
			NoDays: 1,
			AnimalID : animal[0].AnimalID,
			KennelID: 1,
			DateIn : new Date (Date.now()),
			DateOut : new Date (Date.now()),
			DayCareRate : 21.99,
			Discount:animal[0].Discount,
			Status: 'NCI'
		}

		let sqlArray = []
		sqlArray.push(sql_obj)

		booking_lib.create_booking(sqlArray)

		let newobj = JSON.parse(JSON.stringify(sqlArray))
		console.log(newobj)

		newobj[0].BookingID = this.state.id_object.booking_id
		newobj[0].AnimalName = animal[0].AnimalName
		newobj[0].FirstName = animal[0].FirstName
		newobj[0].LastName = animal[0].LastName

		this.state.booking_list.push(newobj[0])

		console.log(this.state.booking_list)
		this.setState({
			animal : animal,
			screen : "home",
		})
	}

	render(){
		//order props neatly
		//pay booking && booking is passed as undefined
		return(
			<div style={{backgroundColor: "#D3D3D3"}}>
				<Navbar updateScreen = {this.updateScreen} side = {this.toggle_side} dogs = {this.state.dog_list}/>
				<div className='wrapper'>
					<Screen updateScreen = {this.updateScreen} payment = {this.get_payment} booking = {this.state.payBooking} id_object = {this.state.id_object} animal = {this.state.animal} screen = {this.state.screen} dogs = {this.state.dog_list} bookings = {this.state.booking_list} currentId = {this.state.booking}/>
					<Sidescreen daycare = {this.get_daycare} client = {this.get_client} profile = {this.full_profile} proc = {this.grab_animal} dogs = {this.state.dog_list} query = {this.state.query} side = {this.toggle_side_off} sidescreen = {this.state.sidescreen}/>
				</div>
			</div>
		);
	}

}