'use strict'

const number = require('./number')
const expiry = require('./expiry')

module.exports = {
	numberAssist: number.assist,
	numberGetValue: number.getValue,
	expiryAssist: expiry.assist,
	expiryGetValue: expiry.getValue,
}
