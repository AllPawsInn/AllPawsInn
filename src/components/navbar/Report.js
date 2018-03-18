'use babel';

import React from 'react';
let date=new Date();

function filterBookingsLessYear(bookings){
  let len= bookings.length;
  let i=0;
  let bookings_started_less_than_year=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1){
      bookings_started_less_than_year++;
    }
    i++;
  }
  return bookings_started_less_than_year;
}
function filterFutureBookings(bookings){
  let len= bookings.length;
  let i=0;
  let future_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()>date.getFullYear()){
      future_bookings++;
    }
    else if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()>date.getMonth()){
      future_bookings++;
    }
    else if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth() && bookings[i].DateIn.getDate()>date.getDate()){
      future_bookings++;
    }
    i++;
  }
  return future_bookings;
}

function filterFutureWeekBookings(bookings){
  let len= bookings.length;
  let i=0;
  let future_week_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth() && bookings[i].DateIn.getDate()<date.getDate()+7 && bookings[i].DateIn.getDate()>date.getDate()){
      future_week_bookings++;
    }
    i++;
  }
  return future_week_bookings;
}
function filterFutureWeekCompareBookings(bookings){
  let len= bookings.length;
  let i=0;
  let future_week_compare_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1 && bookings[i].DateIn.getMonth()==date.getMonth() && bookings[i].DateIn.getDate()<date.getDate()+7 && bookings[i].DateIn.getDate()>date.getDate()){
      future_week_compare_bookings++;
    }
    i++;
  }
  return future_week_compare_bookings;
}
function filterThisMonthBookings(bookings){
  let len= bookings.length;
  let i=0;
  let this_month_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth()){
      this_month_bookings++;
    }
    i++;
  }
  return this_month_bookings;
}
function filterThisMonthCompareBookings(bookings){
  let len= bookings.length;
  let i=0;
  let this_month_compare_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1 && bookings[i].DateIn.getMonth()==date.getMonth()){
      this_month_compare_bookings++;
    }
    i++;
  }
  return this_month_compare_bookings;
}
function filterNextMonthBookings(bookings){
  let len= bookings.length;
  let i=0;
  let next_month_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth()+1){
      next_month_bookings++;
    }
    i++;
  }
  return next_month_bookings;
}
function filterNextMonthCompareBookings(bookings){
  let len= bookings.length;
  let i=0;
  let next_month_compare_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1 && bookings[i].DateIn.getMonth()==date.getMonth()+1){
      next_month_compare_bookings++;
    }
    i++;
  }
  return next_month_compare_bookings;
}

export default class Report extends React.Component {
  constructor(props){
		super(props)
		this.state = {
			bookings : this.props.bookings
		}

	}

	render() {
    if (this.props.bookings){
			return  (
				<div className = "box cal">
          <h1>Reports, Exports, Printouts</h1><br></br>
					<h2>Basic Stats</h2><br></br>
          <h3>KENNEL UNITS</h3><br></br>
          Total number of units:  <b>86</b><br></br><br></br>
          Current number of occupants: <b>{this.state.bookings.length}</b><br></br><br></br>
          % of units Occupied:  <b>78</b><br></br><br></br>
          <h3>BOOKING</h3><br></br><br></br>
          Number of Bookings Started over previous year:  <b>{filterBookingsLessYear(this.state.bookings)}</b><br></br>
          Total Number of Future Bookings:  <b>{filterFutureBookings(this.state.bookings)}</b><br></br><br></br>
          Bookings Expected to Start This Week:  <b>{filterFutureWeekBookings(this.state.bookings)}</b><br></br>
          Compare with a year ago:  <b>{filterFutureWeekCompareBookings(this.state.bookings)}</b><br></br><br></br>
          Bookings Expected to Start This Month  <b>{filterThisMonthBookings(this.state.bookings)}</b><br></br>
          Compare with a year ago:  <b>{filterThisMonthCompareBookings(this.state.bookings)}</b><br></br><br></br>
          Bookings Expected to Start Next Month:<b>{filterNextMonthBookings(this.state.bookings)}</b><br></br>
          Compare with a year ago:  <b>{filterNextMonthCompareBookings(this.state.bookings)}</b><br></br><br></br>
          <h3>DATABASE</h3><br></br><br></br>
          Number of Clients in database: <b>1398</b><br></br><br></br>
          Number of Animals in database: <b>1976</b>
				</div>
			);
  }
		else
			return <div className = "box cal"><h3>Loading...</h3></div>;
	}

}
