const ko = require('kodbm')

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
		delete driver.password
		const driver_ = ko.models.drivers.create(driver)
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
		mailer.sendEmail('pfesznguyen@gmail.com', 'Someone needs a ride!', 'MESSAGE BODY')
		//mailer.sendEmail(driver.email, 'Someone needs a ride!', 'MESSAGE BODY')

		ko.models.hashes.create({
			hash: md5(request.date + request.time + request.address + request.destination + request.rider),
			driver: driver._id,
			rider: request.rider
		}).save()
		.then(cb).catch(cb)
	},
	acceptRequest: function (hash) {
		ko.models.hashes.findOne({hash: hash}).then(function (hashDoc) {

			ko.models.drivers.UPDATE({_id: hashDoc.driver}, { $pull: { rider: hashDoc.rider } }).then(function (ehh) {
				console.log('ehh2', ehh)
			})
			.catch(function (err) {
				console.log('err2', err)
			})

			// add ride to rider
			ko.models.riders.findOne({_id: hashDoc.rider}).then(function (err, rider) {
				request.driver = driver._id
				rider.ride = request
				rider.save().then(function (rider) {
					mailer.sendEmail('pfesznguyen@gmail.com', "A ride has been found", "MESSAGE BODY")
					//mailer.sendEmail(rider.email, "A ride has been found", "MESSAGE BODY")
				})
			})

			ko.models.hashes.UPDATE({hash: hash}, { $pull: { rider: hashDoc.rider } })
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
