'use strict'

module.exports = map

function map($node, mapper) {
	const selectionDirection = $node.selectionDirection
	let selectionStart = $node.selectionStart
	let selectionEnd = $node.selectionEnd

	let value = ''
	let i = 0
	for (const char of $node.value) {
		const replacement = mapper(char, i)
		const lengthDiff = replacement.length - char.length
		if (i < selectionStart) {
			selectionStart += lengthDiff
		}
		if (i < selectionEnd) {
			selectionEnd += lengthDiff
		}
		i += replacement.length
		value += replacement
	}

	$node.value = value
	$node.setSelectionRange(selectionStart, selectionEnd, selectionDirection)

	return value
}
