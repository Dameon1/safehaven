var server = require('diet')

try {
	require('dotenv').config()
} catch (e) {
	// not installed in prod
}

var logger       = require('morgan')
var session      = require('express-session')
var SessionStore = require('express-nedb-session')(session)
var compatible   = require('diet-connect')
var static        = require('diet-static')

var models      = require('./lib/models')
var drivers     = require('./lib/drivers')
var auth        = require('./lib/auth')({authenticate: drivers.authenticate})
var mailer      = require('./lib/mailer')

var app = server()

app.listen('http://localhost:6969')

app.header(compatible(logger('dev')))

app.header(compatible(session({
	secret: '34rlyt3rm1n4t0r',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: (365 * 24 * 3600 * 1000) / 2
	},
	store: new SessionStore({filename: app.path + '/db/session.db'})
})));

app.header(auth.session)

app.footer(static({path: app.path + '/static'}))

app.get('/', function ($) {
	$.sendFile('index.html')
})


app.post('/login', auth.login)
app.get('/logout', auth.logout)

app.get('/login', function ($) {
	$.redirect('/')
	$.end()
})






app.post('/schedule', function ($) {
	const body = JSON.parse($.body)
	const theDate = body.date
	//const dayOfWeek = (new Date(theDate)).getDay()
	//body.date = theDate.getTime()
	// CREATE REQUEST
	const rider = models.riders.create(body).save().then(function (rider) {

		const matches = body.region.match(/([A-Z][A-Z])/)

		if (matches) {
			models.drivers.find({region: new RegExp(matches[1])}).then(function (drivers_) {
				drivers_.forEach(driver => {
					drivers.addRequest(driver, {
						date: "2018-02-09",
						timeOfDay: rider.timeOfDay,
						region: rider.region,
						clinic: rider.clinic,
						rider: rider._id
					})
					$.end('thanks')
				})
			})
		}

	})
	.catch(function (err) {
		console.log('12345')
		console.log(err)
	})
})

app.post('/register', function ($) {
	const body = JSON.parse($.body)
	// register new driver
	drivers.register(body, function (err) {
		//console.log(err)
		$.end('thanks')
	})
})

app.get('/confirm/:hash', function ($) {
	drivers.acceptRequest($.params.hash)
	$.end('Confirmed!')
})


app.get('/reject/:hash', function ($) {
	drivers.acceptRequest($.params.hash)
	$.end('Maybe next time')
})

module.exports = app
