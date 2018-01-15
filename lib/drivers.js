const ko = require('kodbm')

const md5 = require('md5')
const bcrypt = require('bcrypt')

const mailer = require('./mailer')

const saltRounds = 14

module.exports = {
	authenticate: function (email, password, cb) {
		ko.models.drivers.findOne({email: email}).then(function (driver) {
			if (!driver) {
				cb(null, null)
			} else {
				bcrypt.compare(password, driver.password, function (err, authenticated) {
					if (authenticated) {
						return cb(err, driver)
					}
					cb(err, null)
				})
			}
		})
	},
	register: function (driver, cb) {
		const password = driver.password
		console.log(password)
		delete driver.password
		driver.requests = []
		const driver_ = ko.models.drivers.create(driver)
		console.log(password)
		console.log(saltRounds)
		bcrypt.hash(password, saltRounds, function (err, hash) {
			if (err) {
				return cb(err)
			}
			driver_.password = hash
			driver_.save().then(cb).catch(cb)
		})
	},
	addRequest: function (driver, request, cb) {
		ko.models.drivers.UPDATE(driver, { $push: { requests: request } })
		.then(cb).catch(cb)
		// send email to driver
		ko.models.hashes.create({
			hash: md5(request.date + request.time + request.address + request.destination + request.rider),
			driver: driver._id,
			rider: request.rider
		}).save().then(function (hashdoc) {

			console.log(hashdoc)

			mailer.sendEmail('pfesznguyen@gmail.com', 'Someone needs a ride!', null, hashdoc.hash)
			//mailer.sendEmail(driver.email, 'Someone needs a ride!', 'MESSAGE BODY')



		})
		.catch(cb)

	},
	acceptRequest: function (hash) {
		ko.models.hashes.findOne({hash: hash}).then(function (hashDoc) {

			ko.models.drivers.UPDATE({_id: hashDoc.driver}, { $pull: { requests: {$elemMatch: {rider: hashDoc.rider} } } }).then(function (update) {
				console.log('update', update)
			})
			.catch(function (err) {
				console.log('err2', err)
			})

			// add ride to rider
			ko.models.riders.findOne({_id: hashDoc.rider}).then(function (rider) {
				rider.driver = hashDoc.driver
				rider.save().then(function (rider) {
					mailer.sendEmail(rider.email, "A ride has been found", "MESSAGE BODY")
					//mailer.sendEmail(rider.email, "A ride has been found", "MESSAGE BODY")
				})
			})
			.catch(function (err) { console.log(err) })

			ko.models.hashes.UPDATE({hash: hash}, { $pull: { request: { rider: hashDoc.rider } } })
			.then(function (idk) {
				console.log('idk', idk)
			})
			.catch(function (err) {
				console.log(err)
			})
		})
		.catch(function (err) {
			console.log ('Rats!', err)
		})
	},
	rejectRequest: function (hash) {
		ko.models.drivers.UPDATE(driver, { $pull: request }).then(function (ehh) {
			console.log('ehh', ehh)
		})
		.catch(function (err) {
			console.log('err', err)
		})

		ko.models.hashes.UPDATE({hash: hash}, { $pull: { rider: hashDoc.rider } })
		.then(function (idk) {
			console.log('idk', idk)
		})
		.catch(function (err) {
			console.log(err)
		})
	}
}
