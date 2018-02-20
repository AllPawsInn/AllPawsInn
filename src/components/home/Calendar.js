'use babel';

import React from 'react';

export default class Calendar extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			bookings_list : []
		}
	}

	render() {
		if (this.props.animal){
			return (<div>
					<h1>This is calendar</h1>
					<h2>Dog Name: {this.props.animal.AnimalName}</h2>
					<h3>Client Name: {this.props.animal.FirstName} {this.props.animal.LastName}</h3>
					</div>
			);
		}
		else{
			 return (<div className="box item2">
					<h1>This is calendar</h1><br></br>
					</div>
			);
		}
	}
}
