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

Official Exmo documentation used to build this project: [Exmo API
](https://documenter.getpostman.com/view/10287440/SzYXWKPi)

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

* user_info

```js
api.userInfo().then((response) => {

})
```

* order_create

```js
const request = {
    pair: 'BTC_USD',
    quantity: 3,
    price: '40499.2',
    type: "buy",
    client_id: 100500
}
api.orderCreate(request).then((response) => {

})
```

* order_cancel

```js
const orderId = 10525
api.orderCancel(orderId).then((response) => {

})
```

* stop_market_order_create

```js
const request = {
    pair: 'BTC_USD',
    quantity: '10.1',
    trigger_price: '85000',
    type: 'sell',
    client_id: 100500
}
api.stopMarketOrderCreate(request).then((response) => {

})
```

* stop_market_order_cancel

```js
const parentOrderId = 507056272792275327
api.stopMarketOrderCancel(parentOrderId).then((response) => {

})
```

* user_open_orders

```js
const pair = 'BTC_USD'
api.userOpenOrders(pair).then((response) => {

})
```

* user_trades

```js
const pair = 'BTC_USD';
const limit = 100; //the number of returned deals (default: 100, maximum: 100)
const offset = 0; //last deal offset (default: 0)
api.userTrades(pair, limit, offset).then((response) => {

})
```

* user_cancelled_orders

```js
const limit = 100; //the number of returned deals (default: 100, maximum: 10 000)
const offset = 0; //last deal offset (default: 0)
api.userCancelledOrders(limit, offset).then((response) => {

})
```

* order_trades

```js
const orderId = 12345
api.orderTrades(orderId).then((response) => {

})
```

# Features

* async-await

All methods return plain promises, so you can use the await keyword in async functions if needed, for example :

```js

async function yourFunction() {
    const response = await api.currency()
    //your code
}

```

* error-throwing

Throws error, when the response is 200, but contains result : false.
This eliminates the need to make unnecessary checks on the content of the response, allows you to catch such requests through .catch block

```json

{
  "result": false,
  "error": "Error 40003: Authorization error, http header 'Key' not specified"
}


```