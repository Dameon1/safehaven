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
var serve        = require('express-static')

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

app.footer(compatible(serve(app.path + '/static')))

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
	console.log($.body)
	const body = JSON.parse($.body)
	const theDate = body.date
	//const dayOfWeek = (new Date(theDate)).getDay()
	//body.date = theDate.getTime()
	// CREATE REQUEST
	const rider = models.riders.create(body)

	const matches = body.region.match(/([A-Z][A-Z])/)
	if (matches) {
		models.drivers.find({region: new RegExp(matches[1])}).then(function (drivers) {
			drivers.forEach(driver => {
				driver.requests.push({
					date: 11111,
					timeOfDay: body.timeOfDay,
					region: body.region,
					clinic: body.clinic,
					rider: rider._id
				})
				driver.save()
			})
		})
	}
	
	$.end('thanks')
})

app.post('/register', function ($) {
	const body = JSON.parse($.body)
	drivers.register(body, function (err) {
		console.log(err)
		$.end('thanks')
	})
	// register new driver
})

module.exports = app
