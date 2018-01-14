var server = require('diet')

var logger       = require('morgan')
var session      = require('express-session')
var SessionStore = require('express-nedb-session')(session)
var compatible   = require('diet-connect')
var Router       = require('diet-router')
var ect          = require('diet-ect')
var serve        = require('express-static')

var models      = require('./lib/models')
var drivers     = require('./lib/drivers')
var auth        = require('./lib/auth')({authenticate: drivers.authenticate})

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

app.header(ect({path: app.path + '/views'}))

app.header(auth.session)

app.footer(compatible(serve(app.path + '/static')))

Router.extend(app)

// TODO ROUTES

app.get('/', function ($) {
	$.sendFile('index.html')
})

app.post('/schedule/', function ($) {
	console.log($.body)
})

module.exports = app
