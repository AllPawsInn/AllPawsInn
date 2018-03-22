const sqlConfig = require('./sqlconfig')
const sql = require('mssql')

module.exports = {
 create_booking: function(animal, obj){
		function sqlParse(val){ //sql requires date values to be in 02-07-2018 rather than 2-7-2017
			if (val < 10)
				return '0' + val
			else
				return val
		}

		async function insertDog(booking){
			let new_booking = JSON.parse(JSON.stringify(booking))
			forceDate(new_booking)
			let pool = await sql.connect(sqlConfig)
			let result = await pool.request()
				.query(`INSERT INTO BookingObjects (AnimalID, KennelID, DateIn, DateOut, Status, DayCare) VALUES (${new_booking.animal_id}, ${new_booking.kennel_id}, '${new_booking.DateIn}', '${new_booking.DateOut}', '${new_booking.Status}', ${new_booking.Daycare})`)
				//if err sql.close

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
		//push animal's and client's properties to booking
		if(!Number.isInteger(obj.kennel))
			obj.kennel = 1 //do something else with this?


		//iterate over animal/obj properties instead of hardcodeing
		let new_booking = {
			Daycare: obj.Daycare,
			FirstName : animal.FirstName,
			LastName : animal.LastName,
			animal_id : animal.AnimalID,
			kennel_id : obj.kennel, //user prompted in the future
			DateIn : obj.DateIn,
			DateOut : obj.DateOut,
			Status : "NCI"
		}

		insertDog(new_booking)

		return new_booking
	}
}