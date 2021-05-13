'use strict'

const luhn = require('cc-luhn')
const mapValue = require('./map-input-value')

const brands = [
	{label: 'visa', prefixes: ['4']},
	{label: 'mastercard', prefixes: ['2', '5', '6']},
]

module.exports = {assist, getValue}

function getValue($) {
	const digits = $.value.replace(/[^0-9]+/g, '')
	if (digits.length < 12 || digits.length > 19) {
		return null
	} else {
		return digits
	}
}

function assist($, luhnCheckMessage) {
	$.addEventListener(
		'input',
		(e) => {
			e.stopPropagation()
			const value = normalize($)
			validate($, value, luhnCheckMessage)
			renderClasses($, value)
		},
		true
	)
}

function normalize($) {
	return mapValue($, (c, i) => {
		if (!/^[0-9]$/.test(c) || i > 26) {
			return ''
		} else if ((i - 4) % 6 === 0) {
			return '  ' + c
		} else {
			return c
		}
	})
}

function renderClasses($, value) {
	const prefix = value.substr(0, 1)
	for (const brand of brands) {
		if (brand.prefixes.includes(prefix)) {
			$.classList.add(brand.label)
		} else {
			$.classList.remove(brand.label)
		}
	}
}

function validate($, value, luhnCheckMessage) {
	const number = value.replace(/\s/g, '')
	if (luhnCheckMessage && (number.length < 12 || !luhn(true, number))) {
		$.setCustomValidity(luhnCheckMessage)
	} else {
		$.setCustomValidity('')
	}
}
