'use strict'

const mapValue = require('./map-input-value')
const keyCode = require('./key-code')

module.exports = {assist, getValue}

const regex = /^([0-9]{2})  \/  ([0-9]{4}|[0-9]{2})$/

function getValue($) {
	const r = regex.exec($.value)
	if (r === null) {
		return null
	} else {
		const [, month, year] = r
		return {
			year: parseInt(year.padStart(4, '20'), 10),
			month: parseInt(month, 10),
		}
	}
}

function assist($, expiredMessage) {
	$.addEventListener(
		'input',
		(e) => {
			e.stopPropagation()
			const value = normalize($)
			validate($, value, expiredMessage)
		},
		true
	)
	$.addEventListener('keydown', onKeyDown, true)
	$.addEventListener('blur', onBlur, true)

	let tabs = 0

	function onKeyDown(e) {
		if ((e.key === 'Tab' || keyCode(e) === 9) && !e.shiftKey) {
			tab(e)
		} else if (
			e.key === 'Backspace' &&
			$.value.length === 7 &&
			$.selectionStart === $.selectionEnd &&
			$.selectionStart === $.value.length
		) {
			$.value = $.value.slice(0, 2)
			tabs = 0
		}
	}

	function onBlur() {
		tabs = 0
	}

	function tab(e) {
		if (tabs > 0 || $.value === '' || $.value.length > 7) return

		if ($.value.length === 7) {
			tabs++
		}

		if (/^[0-9]$/.test($.value)) {
			mapValue($, (c) => '0' + c + '  /  ')
		}

		e.preventDefault()
	}
}

function normalize($) {
	return mapValue($, (c, i) => {
		if (!/^[0-9]$/.test(c) || i > 10) {
			return ''
		} else if (i === 1) {
			return c + '  /  '
		} else {
			return c
		}
	})
}

function validate($, value, expiredMessage) {
	const r = regex.exec(value)
	if (r === null || !expiredMessage) {
		$.setCustomValidity('')
	} else {
		const [, month, year] = r
		// "month" is 1-12, Date.UTC expects 0-11, but we want to find the
		// expiry, which is at the end of month, thus adding one month.
		const expires = Date.UTC(year.padStart(4, '20'), month, 0, 0, 0, 0, 0)
		if (expires < Date.now()) {
			$.setCustomValidity(expiredMessage)
		} else {
			$.setCustomValidity('')
		}
	}
}
