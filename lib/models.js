var ko = require('kodbm')

ko.models({
	Applicant: {
		name: ko.String,
		password: ko.String,
		location: ko.String,
		ride: [{
			//dateTime: ko.Date
			date: ko.Number,
			time: ko.Number,
			//volunteer: ko.models.Volunteer
		}, null]
	},

	Volunteer: {
		name: ko.String,
		password: ko.String,
		availability: [ko.Number],
		requests: [
			{
				date: ko.Number,
				time: ko.Number,
				location: ko.String
			}
		]
	},

	Schedule: {
		schedule: [{
			date: ko.Number,
			time: ko.Number,
			location: ko.String
		}]
	}
})
