import {Amount, Currency, OrderId, Pair, Price, Quantity, Time, Trade} from "./types";
import {OrderType} from "./requests";

//trades
export interface TradesResponse {
  [key: Pair]: Trade[]
}

//order_book
export type BidAskArray = [Quantity, Price, Amount]

export interface PairBook {
  "ask_quantity": Quantity,
  "ask_amount": Amount,
  "ask_top": Price,
  "bid_quantity": Quantity,
  "bid_amount": Amount,
  "bid_top": Price,
  "ask": BidAskArray[]
  "bid": BidAskArray[]
}

export interface OrderBookResponse {
  [key: Pair]: PairBook
}

//ticker
export interface TickerOptions {
  "buy_price": Price,
  "sell_price": Price,
  "last_trade": Price,
  "high": Price,
  "low": Price,
  "avg": Price,
  "vol": Quantity,
  "vol_curr": Amount,
  "updated": Time
}

export interface TickerResponse {
  [key: Pair]: TickerOptions
}

//pairSettings
export interface PairSettings {
  "min_quantity": Quantity,
  "max_quantity": Quantity,
  "min_price": Price,
  "max_price": Price,
  "max_amount": Amount,
  "min_amount": Amount,
  "price_precision": number,
  "commission_taker_percent": number,
  "commission_maker_percent": number
}

export interface PairSettingsResponse {
  [key: Pair]: PairSettings
}

//currency
export type CurrencyResponse = Currency[]

//currency-list-extended
export interface ExtendedCurrencyListItem {
  name: Currency,
  desctiption: string,
}

export type CurrencyListExtendedResponse = ExtendedCurrencyListItem[]

//required-amount
export interface RequiredAmountResponse{
  "quantity": Quantity,
  "amount": Amount,
  "avg_price": Price
}

//candles-history
export type Candle = {
      "t": Time,
      "o": Price,
      "c": Price,
      "h": Price,
      "l": Price,
      "v": Amount

}

export interface CandlesHistoryNoDataResponse{
  s:string,
  nextTime:number,
}

export interface CandlesHistoryResponse{
  candles: Candle[],
}


export type CryptoProvider = {
  "type": "deposit" | "withdraw", //provider method type, withdrawal or deposit
  "name": string, //provider name
  "currency_name": Currency, //currency name
  "min": Amount, //min amount per operation
  "max": Amount, //max amount per operation
  "enabled": boolean, //provider status
  "comment": string, //comment for provider
  "commission_desc": string, //description of commission
  "currency_confirmations": number //the number of required confirmations for the operation
}

//payments_providers_crypto_list
export interface PaymentProviderCryptoListResponse{
  [key: Currency]: CryptoProvider,
}

export interface OrderCreateResponse {
  "result": boolean,
  "error": string,
  "order_id": number,
  "client_id": number|string
}

export interface OrderCancelResponse {
  "result": boolean,
  "error": string
}
export interface StopMarketOrderCreateResponse {
  "client_id": number|string,
  "parent_order_id": number,
  "parent_order_id_str": string
}
export interface OpenOrder {
  "parent_order_id"?: string,
  "trigger_price"?: Price,
  "order_id"?: OrderId,
  "client_id"?: number|string,
  "created": Time,
  "type": OrderType,
  "pair": Pair,
  "price"?: Price,
  "quantity": Quantity,
  "amount": Amount

}

export interface UserOpenOrdersResponse {
  [key: Pair]:OpenOrder[]
}

export interface UserTrade{
  "trade_id": number,
  "client_id": number|string,
  "date": Time,
  "type": OrderType,
  "pair": Pair,
  "quantity": Quantity,
  "price": Price,
  "amount": Amount,
  "order_id": OrderId,
  "parent_order_id": OrderId,
  "exec_type": 'taker'|'maker',
  "commission_amount": Price,
  "commission_currency": Currency,
  "commission_percent": string
}

export interface UserTradesResponse {
  [key: Pair]:UserTrade[]
}


export interface UserCancelledOrdersResponse {
  [key:Pair]:UserCanceledOrder[]
}

export interface UserCanceledOrder {
  "order_id"?: OrderId,
  "client_id": number|string,
  "created": Time,
  "type": OrderType,
  "pair": Pair,
  "quantity": Quantity,
  "price"?: Price,
  "amount": Amount,
  "parent_order_id"?: OrderId,
  "trigger_price"?: Price,
  "reason_status"?: string
}

export interface OrderTradesResponse {
  "type": OrderType,
  "in_currency": Currency,
  "in_amount": Quantity,
  "out_currency": Currency,
  "out_amount": Amount,
  "trades": UserTrade[],
}

export interface UserInfoResponse {
  "uid": number,
  "server_date": Time,
  "balances": {
    [key:Currency]: Quantity,
  },
  "reserved": {
    [key:Currency]: Quantity,
  }
}
