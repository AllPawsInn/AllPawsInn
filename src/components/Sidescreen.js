'use babel';

import React from 'react'
import SearchPane from './sidescreen/SearchPane';
import AnimalDetails from "./sidescreen/AnimalDetails"

export default class Sidescreen extends React.Component {
		constructor(props){
			super(props)
				this.state = {
						dogs : this.props.dogs,
				}

				this.switch_screen = this.switch_screen.bind(this)
				this.show_animal = this.show_animal.bind(this)

				// pass props if u want to use this.props within the constructor
			// Note that passing or nsot passing props to super has no effect on later uses of this.props
		}
		componentWillReceiveProps(nextProps){
				if (nextProps){
						this.setState({
								dogs: nextProps.dogs
						})
				}
		}

		show_animal(animal){
				this.setState({
						animal : animal
				})
		}

		switch_screen(){
				this.setState({
						search : !(this.state.search)
				})
		}

		render(){
				return(
						<div>
								<button onClick = {this.props.side}> X </button>
								<SearchPane dogs = {this.state.dogs} screen = {this.switch_screen} show = {this.show_animal} query = {this.props.query}/>
								<AnimalDetails proc = {this.props.proc} dogs = {this.state.dogs} animal = {this.state.animal}/>       
						</div>
				);
		}
}
