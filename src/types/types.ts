export type PublicKey = string
export type SecretKey = string

export interface Credentials {
  publicKey: PublicKey,
  secretKey: SecretKey,
}
/** currency (e.g. 'USD')*/
export type Currency = string

/** .pair (e.g. 'USDT_USD')*/
export type Pair = `${Currency}_${Currency}`



/** .order_id, e.g. '26607786418'*/
export type OrderId = number;

/** .created , e.g. '1652257712'*/
export type Time = string

/** .type */
export type OrderType = "buy" | "sell"

/** discreteness of candles, possible values:  */
export type Resolution = '1'| '5'|'15'| '30'| '45'| '60'| '120'| '180'| '240'| 'D'| 'W'| 'M'

/** .quantity of currency to buy/sell e.g. '8.83721775'
 * (first currency in pair, forExample in pair USDT_USD
 * "quantity" describes amount of USDT, that u want to buy or sell ) */
export type Quantity = string

/** .amount of currency to buy/sell, e.g. '8.83721775'
 * (second currency in pair, forExample in pair USDT_USD
 * "amount" describes amount of USD, that you will get
 * for selling quantity of first currency (USDT) )
 * */
export type Amount = string

/** .price e.g. '1.0102'*/
export type Price = string

/** interface of order, that returns from exmo API*/
export interface Order {
  order_id: OrderId,
  created: Time,
  client_id: string|number,
  type: OrderType,
  pair: Pair,
  quantity: Quantity,
  price: Price,
  amount: Amount
}

export type Trade = {
  "trade_id": number
  "type": OrderType
  "price": Price,
  "quantity": Quantity,
  "amount": Amount,
  "date": Time
}

/** the number of displayed positions (default: 100, max: 1000)*/
export type Limit = number

