const ko = require('kodbm')

module.exports = {
	authenticate: function (email, password, cb) {
		ko.models.drivers.findOne({email: email}, function (err, user) {
			if (err) {
				cb(err)
			} else if (!user) {
				cb(null, null)
			} else {
				bcrypt.compare(password, user.password, function (err, authenticated) {
					if (authenticated) {
						return cb(err, user)
					}
					cb(err, null)
				})
			}
		})
	},
}
