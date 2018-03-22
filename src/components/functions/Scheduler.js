'use babel';
import React from 'react';

function dogNames(dogs){
  let dog_list = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="Complete")
      dog_list.push(<li key={i}>{dogs[i].AnimalName}</li>)
  }
  return dog_list;
}
function foodTypes(dogs){
  let food_types = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="Complete")
      food_types.push(<li key={i}>{dogs[i].Food1TypeName}</li>)
  }
  return food_types;
}
function foodQuantities(dogs){
  let food_quantity = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="Complete")
      food_quantity.push(<li key={i}>{dogs[i].Food1Amount}</li>)
  }
  return food_quantity;
}
function foodFreqs(dogs){
  let food_freq = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="Complete")
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
  <table>
   <tbody>
       <tr>
       <th><h2>Dog Name</h2></th>
       <th><h2>Food Type</h2></th>
       <th><h2>Food Quantity</h2></th>
       <th><h2>Food Frequency</h2></th>
      </tr>
        <tr>
    <td>{dogNames(this.props.dogs)}</td>
    <td>{foodTypes(this.props.dogs)}</td>
    <td>{foodQuantities(this.props.dogs)}</td>
    <td>{foodFreqs(this.props.dogs)}</td>
  </tr>
   </tbody>
</table>
			);
  }
		else
			return <div className = "box cal"><h3>Loading...</h3></div>;
	}

}
