'use babel';
import React from 'react';

const PAGE_SIZER = 200
function dogNames(dogs){
  let dog_list = [];
  for (let i =0; i<dogs.length/PAGE_SIZER;i++){
    dog_list.push(<li key={i}>{dogs[i].AnimalName}</li>)
  }
  return dog_list;
}
function foodTypes(dogs){
  let food_types = [];
  for (let i =0; i<dogs.length/PAGE_SIZER;i++){
    food_types.push(<li key={i}>{dogs[i].Food1TypeName}</li>)
  }
  return food_types;
}
function foodQuantitys(dogs){
  let food_quantity = [];
  for (let i =0; i<dogs.length/PAGE_SIZER;i++){
    food_quantity.push(<li key={i}>{dogs[i].Food1Amount}</li>)
  }
  return food_quantity;
}
function foodFreqs(dogs){
  let food_freq = [];
  for (let i =0; i<dogs.length/PAGE_SIZER;i++){
    food_freq.push(<li key={i}>{dogs[i].Food1Freq}</li>)
  }
  return food_freq;
}
export default class Report extends React.Component {
  constructor(props){
		super(props)
		this.state = {
  		dogs : this.props.dogs
		}

	}

	render() {
    if (this.props.dogs){
			return  (
				<div className = "box cal">
					<h1>Feed/Tasks/Meds Scheduler</h1>
          <h3>Dog Name</h3>
          {dogNames(this.props.dogs)}
          <h3>Food Type</h3>
          {foodTypes(this.props.dogs)}
          <h3>Food Quantity</h3>
          {foodQuantitys(this.props.dogs)}
          <h3>Food Frequency</h3>
          {foodFreqs(this.props.dogs)}
				</div>
			);
  }
		else
			return <div className = "box cal"><h3>Loading...</h3></div>;
	}

}
