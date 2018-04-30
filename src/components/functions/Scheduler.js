'use babel';
import React from 'react';

function dogNames(dogs){
  let dog_list = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="CI")
      dog_list.push(<li key={i}>{dogs[i].AnimalName}</li>)
  }
  return dog_list;
}
function medicalConditions(dogs){
  let medical_list = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="CI")
      medical_list.push(<li key={i}>{dogs[i].MedicalConditions}</li>)
  }
  return medical_list;
}

function foodTypes(dogs){
  let food_types = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="CI")
      food_types.push(<li key={i}>{dogs[i].Food1TypeName}</li>)
  }
  return food_types;
}
function foodQuantities(dogs){
  let food_quantity = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="CI")
      food_quantity.push(<li key={i}>{dogs[i].Food1Amount}</li>)
  }
  return food_quantity;
}
function foodFreqs(dogs){
  let food_freq = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="CI")
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
    this.handlePrintSubmit = this.handlePrintSubmit.bind(this)
  }

  handlePrintSubmit(event){
    window.print()
  }

  render() {
    if (this.props.dogs){
      return  (
        <div className="box cal">
  <table>
   <tbody>
       <tr>
       <th><h2>Dog Name</h2></th>
       <th><h2>Medical</h2></th>
       <th><h2>Food Type</h2></th>
       <th><h2>Food Quantity</h2></th>
       <th><h2>Food Frequency</h2></th>
      </tr>
        <tr>
    <td>{dogNames(this.props.dogs)}</td>
    <td>{medicalConditions(this.props.dogs)}</td>
    <td>{foodTypes(this.props.dogs)}</td>
    <td>{foodQuantities(this.props.dogs)}</td>
    <td>{foodFreqs(this.props.dogs)}</td>
  </tr>
   </tbody>
</table>
<span className="print"><button className = "profileButton" onClick = {this.handlePrintSubmit}> Print </button></span>
</div>
      );
  }
    else
      return <div className = "box cal"><h3>Loading...</h3></div>;
  }

}
