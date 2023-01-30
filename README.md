## Installation

```console
$ npm install exmo-ts-api
```

# Set Up

```js
import {ExmoApi} from "exmo-ts-api";

const credentials = {
    publicKey: '*your public key*',
    secretKey: '*your secret key*',
}

const api = new ExmoApi(credentials)

```

If you don't need Authenticagted API for your tasks, you can use it without credentials

```js
import {ExmoApi} from "exmo-ts-api";

const api = new ExmoApi()
```

# Usage

The library implements all endpoints from the official Exmo documentation that are Public Api or Authenticated Api.

Official Exmo documentation used to build this project: [exmo-docs]

### Public API methods:

* trades

```js
const pair = 'BTC_USD' // or ['BTC_USD', 'USDT_USD']
api.trades(pair).then((response) => {
// response example :  {
//     "BTC_USD": [
//         {
//             "trade_id": 3,
//             "type": "sell",
//             "price": "100",
//             "quantity": "1",
//             "amount": "100",
//             "date": 1435488248
//         }
//     ]
// }
})

```

* order_book

```js
const pair = 'BTC_USD' // or ['BTC_USD', 'USDT_USD']
api.orderBook(pair, limit).then((response) => {
    // limit  is the number of displayed positions (default: 100, max: 1000)
})

```

* ticker

```js
const pair = 'BTC_USD' // or ['BTC_USD', 'USDT_USD']
api.ticker(pair).then((response) => {

})
```

* pair_settings

```js
const pair = 'BTC_USD' // or ['BTC_USD', 'USDT_USD']
api.pairSettings(pair).then((response) => {

})
```

* currency

```js
api.currency().then((response) => {

})
```

* currency_list_extended

```js
api.currencyListExtended().then((response) => {

})
```

* required_amount

```js
api.requiredAmount(pair, quantity).then((response) => {
    //quantity to buy/sell (first currancy in pair)

})
```

* candles_history

```js
const time = Math.round(Date.now() / 1000) // time in seconds (NOT in ms like usually)
const from = time.toString()
const to = (time + 3600).toString() // from + 1 hour
api.candlesHistory(pair, from, to, resolution).then((response) => {
    //resolution default = 30

})
```

* payments_providers_crypto_list
```js
api.paymentProviderCryptoList().then((response) => {

})
```

### Authenticated API methods:
....coming soon

# Features
* async-await

All methods return plain promises, so you can use the await keyword in async functions if needed, for example : 
```js

async function yourFunction (){
    const response = await api.currency()
    //your code
}

```