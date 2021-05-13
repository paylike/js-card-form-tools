# Card form tools

```js
const {
  numberAssist,
  numberGetValue,
  expiryAssist,
  expiryGetValue,
} = require('@paylike/card-form-tools')

numberAssist(
  document.querySelector('input.card-number'),
  'Card number failed LUHN check' // omit to disable check
)

numberGetValue(document.querySelector('input.card-number'))
// → null or a string ([0-9]{12,19})

expiryAssist(document.querySelector('input.expiry'))

expiryGetValue(document.querySelector('input.expiry'))
// → null or {year: Integer (2000-2099), month: Integer (0-12)}
```
