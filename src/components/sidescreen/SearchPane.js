// ---------------------------------------- TO DO ----------------------------------------
// inputbox onSubmt prevent default
// duplicate/modify filter_function and render clients on search as well
// unified form of convention among all files => functions vs variable names
// onfocus search item broken

'use babel';

import React from 'react';
import { SelectableGroup, createSelectable } from 'react-selectable';
import SearchItem from './SearchItem';

const SelectableItem = createSelectable(SearchItem);

function filter_function(query){
	return function(obj){
		let max_letter = 2  //option to change on admin panel?
		let concat_name = `${obj.FirstName.toLowerCase()}${obj.LastName.toLowerCase()}`.replace(/ /g,'') // trim this maybe?
		return (obj.AnimalName.toLowerCase().includes(query.toLowerCase()) || obj.FirstName.toLowerCase().includes(query.toLowerCase()) || obj.LastName.toLowerCase().includes(query.toLowerCase()) || concat_name.includes(query.toLowerCase().replace(/ /g,'')))
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
			test : this.props.test,
			selectedKeys : []
		}

		this.searchHandler = this.searchHandler.bind(this)
		this.handleElement = this.handleElement.bind(this)
		this.handleSelection = this.handleSelection.bind(this)
	}

	handleSelection (selectedKeys) {
  	this.setState({
  		selectedKeys : selectedKeys
  	});
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
			<div>
				<div className = "box search"><h1>Search</h1>
					<button onClick = {this.props.side}> X </button>
					<SelectableGroup onSelection={this.handleSelection} >
						{
							list.filter(filter_function(query)).map(obj => //arrow function instead
								 <div className = "searchItem" tabIndex = {1} key = {obj.AnimalID} onClick = {() => {this.handleElement(list.indexOf(obj))}}>
								 <SelectableItem 
									key = {obj.AnimalID}
									selectableKey = {list.indexOf(obj)} 
									className = "try" 
									FirstName = {obj.FirstName} 
									LastName = {obj.LastName} 
									AnimalName = {obj.AnimalName} 
									Breed = {obj.Breed}/
								>	
								</div>			
							)
						}
					</SelectableGroup>
				</div>
				<div className = "box search"><h1>Search</h1>
					<button onClick = {this.props.side}> X </button>
					{
						list.filter(filter_function(query)).map(obj => //arrow function instead
							<div className = "searchItem" onClick = {() => {this.handleElement(list.indexOf(obj))}} key = {obj.AnimalID} tabIndex={1} >
								<span><b>{obj.FirstName} {obj.LastName} / {obj.AnimalName} /</b> {obj.Breed}<br></br></span>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}
