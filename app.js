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

				  require('./lib/models')
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

app.post('/schedule/', function ($) {
	console.log($.body)
	$.end('thanks')
})

app.post('/register/', function ($) {
	console.log($.body)
	$.end('thanks')
	// register new driver
})

app.post('/confirm/', function ($) {
	console.log($.body)
	$.end('whatever')
})

module.exports = app
