'use strict'

module.exports = keyCode

function keyCode(e) {
	return e.keyCode || e.which
}
