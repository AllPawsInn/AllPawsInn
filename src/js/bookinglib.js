const sqlConfig = require('./sqlconfig')
const sql = require('mssql')

module.exports = {
 create_booking: function(obj){
		function sqlParse(val){ //sql requires date values to be in 02-07-2018 rather than 2-7-2017
			if (val < 10)
				return '0' + val
			else
				return val
		}

		async function insertDog(booking){
			let new_booking = JSON.parse(JSON.stringify(booking))
			forceDate(new_booking)
			new_booking.DateIn = new_booking.DateIn.toString()
			new_booking.DateOut = new_booking.DateIn.toString()

			let keys = ''
			let values = ''
			for (let key in new_booking){
				keys = keys + key + ', '
				if(typeof new_booking[key] === 'string')
					values = values + `'${new_booking[key]}'` + ', '
				else
					values = values + new_booking[key] + ', '
			}
			values = values.slice(0, -2) //trim off the extra comma and whitespace
			keys = keys.slice(0, -2)

			let qr = `INSERT INTO BookingObjects (${keys}) VALUES (${values})`
			let pool = await sql.connect(sqlConfig)
				//if err s
			let result = await pool.request()
				.query(qr)

			sql.close()
		}

		function toDatetime(date){
			let formatted = `${date.getFullYear()}-${sqlParse(date.getMonth() + 1)}-${sqlParse(date.getDate())}T${sqlParse(date.getHours())}:${sqlParse(date.getMinutes())}:${sqlParse(date.getSeconds())}`
			return formatted
		}

		function dateNow(){
			let dt = new Date ()
			return dt
		}

		function dateOut(epoch){
			//use an epoch converter to build the check out date
			//epoch is to supposed to be the appointment duration
			let dt = new Date (Date.now() + 604800000)
			return dt
		}

		function forceDate(booking){
			booking.DateIn = toDatetime(new Date(Date.parse(booking.DateIn)))
			booking.DateOut = toDatetime(new Date(Date.parse(booking.DateOut)))
		}
		//check if values are empty
		//push animal client's properties to booking
		if(!Number.isInteger(obj.KennelID))
			obj.KennelID = 1 //do something else with this?
		//check if kennel is empty

		insertDog(obj)
	}
}