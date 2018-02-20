'use babel';

import React from 'react';

export default class
 Navbar extends React.Component {

	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		let query = event.target.value
		this.props.side(query)
	}

	handle(){
		alert("no")
		//handle me
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
								<li className ="dropdown">
									<a href="#" className ="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">New Booking <span className ="caret"></span></a>
									<ul className ="dropdown-menu">
										<li><a onClick = {this.props.updateScreen.bind(this, "about")}><span className ="glyphicon glyphicon-th-list" aria-hidden="true"></span> New Booking</a></li>
										<li><a href="#"><span className ="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New Client</a></li>
										<li role="separator" className ="divider"></li>
										<li><a href="#">Categories</a></li>
									</ul>
								</li>
								<li><a onClick = {this.props.updateScreen.bind(this, "about")}>Print</a></li>								
							</ul>
							<ul className ="nav navbar-nav navbar-right">
								<li className ="dropdown">
									<a href="#" className ="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className
										="glyphicon glyphicon-link" aria-hidden="true"></span> Functions<span className ="caret"></span></a>
									<ul className ="dropdown-menu">
										<li><a href="taskScheduler.html">Scheduler</a></li>
									</ul>
								</li>
								<li>
									<form className ='form-inline' style = {{marginTop:"9px"}}>
										<input className="form-control mr-sm-2" type = "text" onChange = {this.handleChange}/>
									</form>
							</li>
							</ul>
						</div>
					</div>
				</nav>
			// <div style = {{backgroundColor: "white"}}>
			// 	<button onClick = {this.props.updateScreen.bind(this, "home")}>AllPawsInn</button>
			// 	<button onClick = {this.props.updateScreen.bind(this, "home")}>Dashboard</button>
			// 	<button onClick = {this.props.updateScreen.bind(this, "about")}>New Booking</button>
			// 	<button onClick = {this.props.updateScreen.bind(this, "about")}>Print</button>
			// 	<button onClick = {this.props.updateScreen.bind(this, "status")}>Status</button>
			// 	<button onClick = {this.props.updateScreen.bind(this, "functions")}>Functions</button>
			// 	<button onClick = {this.handle.bind(this)}>Add Dog</button>
			// 
			// 	<form>
			// 		<input type = "text" onChange = {this.handleChange}/>
			// 	</form>
			// </div>
		);
	}

}

