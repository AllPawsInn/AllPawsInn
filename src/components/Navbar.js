'use babel';

import React from 'react';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		let query = event.target.value
		this.props.side(query)
	}

	render() {
		return(
			<nav className ="navbar navbar-default">
				<div className ="container-fluid">
					<div className ="navbar-header">
						<button type="button" className ="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className ="sr-only">Toggle navigation</span>
							<span className ="icon-bar"></span>
							<span className ="icon-bar"></span>
							<span className ="icon-bar"></span>
						</button>
						<a className ="navbar-brand" onClick = {this.props.updateScreen.bind(this, "home")}>AllPawsInn</a>
					</div>
					<div className ="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className ="nav navbar-nav">
							<li><a onClick = {this.props.updateScreen.bind(this, "home")}><span className ="glyphicon glyphicon-th" aria-hidden="true"></span> Dashboard</a></li>
							<li><a onClick = {this.props.updateScreen.bind(this, "new_booking")}><span className ="glyphicon glyphicon-th-list" aria-hidden="true"></span> New Booking</a></li>
							<li><a onClick = {this.props.updateScreen.bind(this, "report")}>Basic Stats</a></li>
						</ul>
						<ul className ="nav navbar-nav navbar-right">
							<li className ="dropdown">
								<a href="#" className ="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className
									="glyphicon glyphicon-link" aria-hidden="true"></span> Functions<span className ="caret"></span></a>
								<ul className ="dropdown-menu">
									<li><a onClick = {this.props.updateScreen.bind(this, "scheduler")}>Scheduler</a></li>
								</ul>
							</li>
							<li>
								<div className ='form-inline' style = {{marginTop:"9px"}}>
									<input className="form-control mr-sm-2" type = "text" onChange = {this.handleChange} onFocus = {this.handleChange}/>
								</div>
						</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
