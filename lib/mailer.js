const nodemailer = require('nodemailer')

module.exports = {
	sendEmail: function (subject, message) {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.SAFEHAVEN_NET__EMAIL_ACCOUNT,
				pass: process.env.SAFEHAVEN_NET__EMAIL_PASSWORD
			}
		})

		var mailOpts = {
			from: '2b2tchat@gmail.com',
			to: 'pfesznguyen@gmail.com',
			subject: subject,
			text: message
		}

		transporter.sendMail(mailOpts, function (error) {
			if (error) {
				console.log('could not send the email')
			}
			console.log('nice: sent an email')
		})
	}
}
