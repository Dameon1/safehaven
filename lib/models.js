var ko = require('kodbm')

ko.models({
	riders: {
		email: ko.String,
		region: ko.String,
		date: ko.Number,
		timeOfDay: ko.String,
		clinic: ko.String,
		driver: [ko.String, null]
	},

	drivers: {
		name: ko.String,
		email: ko.String,
		phone: ko.String,
		region: ko.String,
		password: ko.String,
		availability: {
			monday: [ko.Number],
			tuesday: [ko.Number],
			wednesday: [ko.Number],
			thursday: [ko.Number],
			friday: [ko.Number],
		},
		requests: [
			{
				date: ko.Number,
				timeOfDay: ko.String,
				region: ko.String,
				clinic: ko.String,
				rider: ko.String // _id
			}
		]
	},

	hashes: {
		hash: ko.String,
		driver: ko.String, //_id
		rider: ko.String, //_id
	}
})

module.exports = ko.models
