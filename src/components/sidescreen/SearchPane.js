// ---------------------------------------- TO DO ----------------------------------------
// inputbox onSubmt prevent default
// duplicate/modify filter_function and render clients on search as well

'use babel';

import React from 'react';

function filter_function(query){
	return function(obj){
		let max_letter = 2  //option to change on admin panel?
		return (obj.AnimalName.toLowerCase().includes(query.toLowerCase()) || obj.FirstName.toLowerCase().includes(query.toLowerCase()) || obj.LastName.toLowerCase().includes(query.toLowerCase()))
		&& (query.length > max_letter || (obj.AnimalName === max_letter || obj.FirstName === max_letter || obj.LastName === max_letter))
		&& obj;	
		// test to confirm if this works on 2 letter matching queries
	}
}
	
function query_match(obj, query){
	obj.toLowerCase.includes(query.toLowerCase())
}

export default class SearchPane extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			list : this.props.dogs,
			query : this.props.query,
			test : this.props.test
		}

		this.searchHandler = this.searchHandler.bind(this)
		this.handleElement = this.handleElement.bind(this)
	}

	searchHandler(event){
		this.setState({
			query : event.target.value
		})
	}

	handleElement(index){
		let element = this.state.list[index]
		this.props.show(element)
	}

	componentWillReceiveProps(nextProps) {
				if (nextProps){
						this.setState({
								list: nextProps.dogs,
								query : nextProps.query
						})
				}
		}

	render() {
		let {query, list} = this.state;
		// abbreviation for
		// query = this.state.query
		// list = this.state.list
		
		if (!list) 
			list = []

		//can use array index for as unique div key as well
		return (
			<div className = "search">Search
				{
					list.filter(filter_function(query)).map(obj => //arrow function instead
						<div onClick = {() => {this.handleElement(list.indexOf(obj))}} key = {obj.AnimalID}>
							<span>{obj.FirstName} {obj.LastName}/{obj.AnimalName}/{obj.Breed}<br></br></span>
						</div>
					)
				}
			</div>
		);
	}
}
