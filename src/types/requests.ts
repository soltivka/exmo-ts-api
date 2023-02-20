import {Pair, Price, Quantity} from "./types";

export type PairRequest = Pair | Pair[]

export type OrderType = 'buy' | 'sell' | 'market_buy' | 'market_sell'

export type OrderCreateRequest = {
  pair: Pair,
  quantity: Quantity,
  price: Price,
  type: OrderType,
  client_id?: number|string,
}
export type StopMarketOrderCreateRequest = {
  pair: Pair,
  quantity: Quantity,
  trigger_price: Price
  type: 'sell' | 'buy',
  client_id?: number|string
}

