// ---------------------------------------- TO DO ----------------------------------------

'use babel';

import React from 'react';
import ReactDataGrid from 'react-data-grid';


let rows = [];
const rowGetter = rowNumber => rows[rowNumber];


async function updateDaysQuery(bookingObject){

	const sqlConfig = require('../../../js/sqlconfig')
	const sql = require('mssql')
	let pool = await sql.connect(sqlConfig)

	let days = bookingObject.Days
	let bookingId = parseInt(bookingObject.BookingID)

	let queryString = "UPDATE dbo.BookingObjects SET dbo.BookingObjects.Days = '" + days + "' WHERE dbo.BookingObjects.BookingID = " + bookingId

	let result = await pool.request()
		 .query(queryString)

	let noDays = bookingObject.NoDays

	queryString = "UPDATE dbo.BookingObjects SET dbo.BookingObjects.NoDays = " + noDays + " WHERE dbo.BookingObjects.BookingID = " + bookingId

	result = await pool.request()
		 .query(queryString)

	sql.close()
}

export default class Grid extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			rows,
			selectedIndexes: [],
		}

		this._columns = [
			{ key: 'info', name: 'Client/Dog' },
			{ key: 'm', name: 'Monday'},
			{ key: 't', name: 'Tuesday' },
			{ key: 'w', name: 'Wednesday' },
			{ key: 'r', name: 'Thursday' },
			{ key: 'f', name: 'Friday' },
			{ key: 'total', name: 'Total'},
			{ key: 'co', name: 'Check-Out' }
		];

		this.createRows = this.createRows.bind(this)
		this.rowGetter = this.rowGetter.bind(this)
		this.setRows = this.setRows.bind(this)
		this.emptyRows = this.emptyRows.bind(this)
		this.onCellSelected = this.onCellSelected.bind(this)
	}

	createRows(booking) {
		let day = (booking.Days)

		let total = booking.NoDays * booking.DayCareRate

		let taxRate = 8

		let tax = ((total*taxRate)/100)

		total = total + tax

		rows.push({
			info: booking.FirstName + ' ' + booking.LastName + '/' + booking.AnimalName,
			m: (day.includes("m")) ? 'X' : '',
			t: (day.includes("t")) ? 'X' : '',
			w: (day.includes("w")) ? 'X' : '',
			r: (day.includes("r")) ? 'X' : '',
			f: (day.includes("f")) ? 'X' : '',
			total: total.toFixed(2),
			co: 'Check-Out',
			booking: booking
			}
		);
	}

	rowGetter(i) {
			return this._rows[i];
	}


	onCellSelected ( rowIdx, idx )  {
		let date = new Date(Date.now())
		let day = date.toString().substring(0, 3)
		let dayNo = 1;
		switch(day){
			case 'Mon':
				dayNo = 1
				break;
			case 'Tue':
				dayNo = 2
				break;
			case 'Wed':
				dayNo = 3
				break;
			case 'Thu':
				dayNo = 4
				break;
			case 'Fri':
				dayNo = 5
				break;
			case 'Sat':
				dayNo = 6
				break;
			case 'Sun':
				dayNo = 7
				break;
		}
		if(rowIdx.idx >= 1 && rowIdx.idx <= 5){
			switch(rowIdx.idx){
				case 1:
					if(dayNo <= 1){
						if(this._rows[rowIdx.rowIdx].m !== 'X'){
							this._rows[rowIdx.rowIdx].m = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'm'

							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate
							let taxRate = 8

							let tax = ((total*taxRate)/100)

							total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
						}
						else{
							if(this._rows[rowIdx.rowIdx].booking.NoDays !== 1){
								this._rows[rowIdx.rowIdx].m = ''
								this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
								this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('m','');

	 							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

								let taxRate = 8

								let tax = ((total*taxRate)/100)

								total = total + tax
								this._rows[rowIdx.rowIdx].total = total.toFixed(2)
							}
						}
					}
					break;
				case 2:
					if(dayNo <= 2){
						if(this._rows[rowIdx.rowIdx].t !== 'X'){
							this._rows[rowIdx.rowIdx].t = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 't'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

							let taxRate = 8

							let tax = ((total*taxRate)/100)

							total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
						}
						else{
							if(this._rows[rowIdx.rowIdx].booking.NoDays !== 1){
								this._rows[rowIdx.rowIdx].t = ''
								this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
								this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('t','');
								let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

								let taxRate = 8

								let tax = ((total*taxRate)/100)

								total = total + tax
								this._rows[rowIdx.rowIdx].total = total.toFixed(2)
							}
						}
					}
					break;
				case 3:
					if(dayNo <= 3){
						if(this._rows[rowIdx.rowIdx].w !== 'X'){
							this._rows[rowIdx.rowIdx].w = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'w'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

							let taxRate = 8

							let tax = ((total*taxRate)/100)

							total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
						}
						else{
							if(this._rows[rowIdx.rowIdx].booking.NoDays !== 1){
								this._rows[rowIdx.rowIdx].w = ''
								this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
								this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('w','');

								let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

								let taxRate = 8

								let tax = ((total*taxRate)/100)

								total = total + tax
								this._rows[rowIdx.rowIdx].total = total.toFixed(2)
							}
						}
					}
					break;
				case 4:
					if(dayNo <= 4){
						if(this._rows[rowIdx.rowIdx].r !== 'X'){
							this._rows[rowIdx.rowIdx].r = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'r'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

							let taxRate = 8

							let tax = ((total*taxRate)/100)

							total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
						}
						else{
							if(this._rows[rowIdx.rowIdx].booking.NoDays !== 1){
								this._rows[rowIdx.rowIdx].r = ''
								this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
								this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('r','');

								let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

								let taxRate = 8

								let tax = ((total*taxRate)/100)

								total = total + tax
								this._rows[rowIdx.rowIdx].total = total.toFixed(2)
							}
						}
					}
					break;
				case 5:
					if(dayNo <= 5){
						if(this._rows[rowIdx.rowIdx].f !== 'X'){
							this._rows[rowIdx.rowIdx].f = 'X'
							this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays + 1
							this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days + 'f'
							let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

							let taxRate = 8

							let tax = ((total*taxRate)/100)

							total = total + tax
							this._rows[rowIdx.rowIdx].total = total.toFixed(2)
						}
						else{
							if(this._rows[rowIdx.rowIdx].booking.NoDays !== 1){
								this._rows[rowIdx.rowIdx].f = ''
								this._rows[rowIdx.rowIdx].booking.NoDays = this._rows[rowIdx.rowIdx].booking.NoDays - 1
								this._rows[rowIdx.rowIdx].booking.Days = this._rows[rowIdx.rowIdx].booking.Days.replace('f','');

								let total = this._rows[rowIdx.rowIdx].booking.NoDays * this._rows[rowIdx.rowIdx].booking.DayCareRate

								let taxRate = 8

								let tax = ((total*taxRate)/100)

								total = total + tax
								this._rows[rowIdx.rowIdx].total = total.toFixed(2)
							}
						}
					}
					break;
			}
			updateDaysQuery(this._rows[rowIdx.rowIdx].booking)
			this.setRows()
		}

	};

	setRows(){
	this._rows = rows;
	};

	emptyRows(){
		rows = []
		this._rows = []
	}

	render(){
		this.emptyRows()
		const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
		return(
			<div>
				{this.props.current.map(obj => //arrow function instead
					<div key = {obj.BookingID}>
						{this.createRows(obj)}
					</div>
					)
				}
				{this.setRows()}
				<div  id="dataGrid" style={{marginTop: '20px'}} >
					<ReactDataGrid
						ref={ node => this.grid = node }
						columns={this._columns}
						rowGetter={this.rowGetter}
						rowsCount={this._rows.length}
						minHeight={500}
						enableCellSelect={true}
						onCellSelected={this.onCellSelected}
					/>
				</div>
			</div>
		)
	}
}
