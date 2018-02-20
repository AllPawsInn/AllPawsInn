'use babel';

import React from 'react'
import ReactDOM  from 'react-dom'
import Navbar from './Navbar'
import Screen from './Screen'
import Sidescreen from './Sidescreen'

export default class Main extends React.Component {
	constructor(props) {
    	super(props) 
    	this.state = {
			dog_list : []
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

		const sql = require('mssql');
		let sqlConfig = {
			user: 'admin', // your mssql account
			password: 'alisan12',
			server: 'DESKTOP-RA1SLRQ', // your server name
			database: 'KMDB'
		}

		// insert => "INSERT INTO dbo.Colours (ColourName) VALUES ('Blue')"
		// delete => "DELETE FROM dbo.Animals WHERE ID = 16"
		// select => "SELECT * FROM dbo.Animals"

		let pool = await sql.connect(sqlConfig)
		let result = await pool.request()
		   .query("SELECT * from dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID")

		
		sql.close()

		this.setState({
			dog_list : result.recordset
		})

		console.log(result.recordset)
		
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
			animal: animal
		})
	}

	render(){
		if (this.state.sidescreen){
			return(
				<div>
					<Navbar updateScreen = {this.updateScreen} side = {this.toggle_side} dogs = {this.state.dog_list}/>
					<Screen screen = {this.state.screen} dogs = {this.state.dog_list} animal = {this.state.animal}/>
					<Sidescreen proc = {this.grab_animal} dogs = {this.state.dog_list} query = {this.state.query} side = {this.toggle_side_off}/>
				</div>
			);
		}

		else{
			return(
				<div>
					<Navbar updateScreen = {this.updateScreen} side = {this.toggle_side} dogs = {this.state.dog_list}/>
					<Screen screen = {this.state.screen} dogs = {this.state.dog_list}/>
				</div>
			);
		}
	}
}