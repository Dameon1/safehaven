var ko = require('kodbm')

ko.models({
	riders: {
		email: ko.String,
		location: ko.String,
		ride: [{
			date: ko.Number,
			time: ko.String,
			address: ko.String,
			destination: ko.String,
			rider: ko.String, // _id
			driver: ko.String // _id
		}, null]
	},

	drivers: {
		name: ko.String,
		email: ko.String,
		password: ko.String,
		availability: [ko.Number],
		requests: [
			{
				date: ko.Number,
				time: ko.String,
				address: ko.String,
				destination: ko.String,
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
