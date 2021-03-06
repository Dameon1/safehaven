module.exports = function (options) {
	const authenticate = options.authenticate
	const loginUrl = options.login || '/login'
	const logoutUrl = options.logout || '/logout'

	return {
		session: function ($) {
			if ($.session.user) {
				$.user = $.session.user
			}
			$.return()
		},
		login: function ($) {
			authenticate(String($.body.username), String($.body.password), function (err, user) {
				console.log(user)
				if (err) throw err
				if (!user) {
					$.session.failedLogin = true
					$.redirect(loginUrl)
					return $.end()
				}
				$.user = user
				$.session.user = user
				if ($.session.returnTo) {
					$.redirect($.session.returnTo)
					$.session.returnTo = undefined
					return $.end()
				}
				$.redirect('/')
				$.end()
			})
		},
		logout: function ($) {
			if ($.query && $.query.loggedout) {
				$.session.loggedOut = true
				$.redirect(loginUrl)
				return $.end()
			}
			$.session.destroy(function (err) {
				if (err) throw err
				$.redirect('/')
				$.end()
			})
		},
		isLoggedIn: function ($) {
			if ($.user) {
				return $.return();
			} else {
				$.status('401')
				$.end();
			}
		},
		ensureLoggedIn: function ($) {
			if ($.user) {
				return $.return()
			}
			$.session.returnTo = $.request.url
			$.redirect(loginUrl)
			$.end()
		}
	}
}
