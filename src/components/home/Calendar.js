'use babel';

import React from 'react';

function getDate(){
	return new Date (Date.now()).toString()
}

function getDateOut(){
	return new Date (Date.now() + (604000)).toString()
}

export default class Calendar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			current_page : 0,
			cur_id : this.props.currentId,
			bookings_list : this.props.bookings
		}
		this.changeStatus = this.changeStatus.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if (nextProps && nextProps.bookings){
						this.setState({
								bookings_list: nextProps.bookings,
						})
				}
	}

	changeStatus(event){
		let cur_content = event.currentTarget.innerHTML
		
		if (cur_content.includes("Not Checked In"))
			event.currentTarget.innerHTML = "Status : <!-- /react-text --><b>Checked In</b><!-- react-text: 304 -->"
		else if (cur_content.includes("Checked In"))
			event.currentTarget.innerHTML = "Status : <!-- /react-text --><b>Checked Out</b><!-- react-text: 304 -->"

	}

	render() {
		if (this.state.bookings_list){
			return(
			<div className="box item2">
			{
			this.state.bookings_list.map(obj => //arrow function instead
				<div key = {obj.BookingId}>
					<span>{obj.FirstName} {obj.LastName}/{obj.AnimalName}/{obj.Breed}<br></br>
					DateIn : {getDate()} <br></br>
					DateOut : {getDateOut()} <br></br></span>
					<div onClick = {this.changeStatus}>
						Status : <b>Not Checked In</b>
					</div>
				</div>
				)
			}
			</div>);
		}
		else{
			 return (
				<div className="box item2">
					<h1>This is calendar</h1><br></br>
				</div>
			);
		}
	}
}
