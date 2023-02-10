import * as CryptoJS from "crypto-js";
import {Credentials, Limit, OrderId, Pair, Quantity, Resolution, Time} from "../types/types";
import {OrderCreateRequest, PairRequest, StopMarketOrderCreateRequest} from "../types/requests";
import {
  CandlesHistoryNoDataResponse,
  CandlesHistoryResponse,
  CurrencyListExtendedResponse,
  CurrencyResponse,
  OrderBookResponse,
  OrderCancelResponse,
  OrderCreateResponse,
  OrderTradesResponse,
  PairSettingsResponse,
  PaymentProviderCryptoListResponse,
  RequiredAmountResponse,
  StopMarketOrderCreateResponse,
  TickerResponse,
  TradesResponse,
  UserCancelledOrdersResponse,
  UserInfoResponse,
  UserOpenOrdersResponse,
  UserTradesResponse
} from "../types/responses";
import axios from "axios";
import Request from "./Request";

export class ExmoApi {
  private _credentials: Credentials
  private _url: string = 'https://api.exmo.com/v1.1/'
  private sender = new Request()
  private requestsSchedule:boolean;

  constructor(credentials:Credentials={publicKey:'', secretKey:''}) {
    this._credentials = credentials
    this.requestsSchedule=false
  }

  requestsScheduleOn = (on:boolean)=>{
    this.requestsSchedule = on
  }

  private isAuthMethod = (methodName: string) => {
    const authMethods = ['user_info', 'order_create', 'order_cancel', 'stop_market_order_create',
      'stop_market_order_cancel', 'user_open_orders', 'user_trades', 'user_cancelled_orders', 'order_trades',
      'deposit_address', 'withdraw_crypt']
    return Boolean(authMethods.find((el)=>el===methodName))
  }

  private sign = (message: string) => {
    return CryptoJS.HmacSHA512(message, this._credentials.secretKey).toString(CryptoJS.enc.Hex);
  }
  private nonce=0


  private api_query = async <T>(method_name: string, data: any = {}, method: 'GET' | 'POST' = 'POST', withBody: boolean = true): Promise<T> => {
    if (this.isAuthMethod(method_name)) {
      let nonce = Math.floor(new Date().getTime())
      if(nonce <= this.nonce){
        nonce=this.nonce+1
      }
      this.nonce=nonce
      data["nonce"] = nonce
    }

    const post_data = new URLSearchParams(data).toString();
    const url = this._url + method_name;
    const options: any = {
      method: method,
      url: url,
      headers: {
        'Key': this._credentials.publicKey,
        'Sign': this.sign(post_data),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams(data)
    };
    if (withBody) {
      options.data = new URLSearchParams(data)
    }
    let result;
    if(this.requestsSchedule){
      result = await (this.sender.init(async ()=>(await axios(url, options)).data))
    }else{
      result = (await axios(url, options)).data
    }
    if(result.error){
      throw new Error(result.error)
    }
    return result as T
  }
  //Public API
  trades = async (pair: PairRequest): Promise<TradesResponse> => {
    if (pair instanceof Array) {
      return (await this.api_query<TradesResponse>("trades", {pair: pair.join(',')}))
    }
    return (await this.api_query<TradesResponse>("trades", {pair: pair}))
  }
  /**Limit -  the number of displayed positions (default: 100, max: 1000)*/
  orderBook = async (pair: Pair | Pair[], limit?: Limit): Promise<OrderBookResponse> => {
    const request: any = {}
    request.pair = pair
    if (pair instanceof Array) {
      request.pair = pair.join(',')
    }
    if (limit) {
      request.limit = limit
    }
    return (await this.api_query<OrderBookResponse>("order_book", request))
  }

  ticker = async (pair?: Pair | Pair[]): Promise<TickerResponse> => {
    const response = (await this.api_query<TickerResponse>("ticker"))
    if (!pair) {
      return response
    }
    if (pair instanceof Array) {
      return pair.reduce((prev, curr) => {
        return {...prev, [curr]: response[curr]}
      }, {})
    }
    return {[pair]: response[pair]}
  }

  pairSettings = async (pair?: Pair | Pair[]): Promise<PairSettingsResponse> => {
    const response = (await this.api_query<PairSettingsResponse>("pair_settings"))
    if (!pair) {
      return response
    }
    if (pair instanceof Array) {
      return pair.reduce((prev, curr) => {
        return {...prev, [curr]: response[curr]}
      }, {})
    }
    return {[pair]: response[pair]}
  }

  currency = async (): Promise<CurrencyResponse> => {
    return (await this.api_query<CurrencyResponse>("currency"))
  }

  currencyListExtended = async (): Promise<CurrencyListExtendedResponse> => {
    const response = await this.api_query<CurrencyListExtendedResponse>("currency/list/extended", {}, 'GET', false)
    return (response)
  }

  requiredAmount = async (pair: Pair, quantity: Quantity): Promise<RequiredAmountResponse> => {
    const request = {
      pair: pair,
      quantity: quantity,
    }
    return (await this.api_query<RequiredAmountResponse>("required_amount", request))
  }

  candlesHistory = async (pair: Pair, from: Time, to: Time, resolution: Resolution = '30'): Promise<CandlesHistoryResponse | CandlesHistoryNoDataResponse> => {
    const request = {
      symbol: pair,
      resolution: resolution,
      from: from,
      to: to,
    }
    const searchParams = new URLSearchParams(request)
    const url = "candles_history?" + searchParams
    const response = await this.api_query<any>(url, {}, 'GET');
    if (response.s) {
      return response as CandlesHistoryNoDataResponse
    }
    return response as CandlesHistoryResponse
  }

  paymentProviderCryptoList = async (): Promise<PaymentProviderCryptoListResponse> => {
    return await this.api_query<PaymentProviderCryptoListResponse>("payments/providers/crypto/list", undefined, 'GET', false)
  }

  //Authenticated API

  userInfo = async (): Promise<UserInfoResponse> => {
    return (await this.api_query<UserInfoResponse>("user_info", {}))
  }

  orderCreate = async (request:OrderCreateRequest): Promise<OrderCreateResponse> => {
    return (await this.api_query<OrderCreateResponse>("order_create", request))
  }

  orderCancel = async (orderId:OrderId): Promise<OrderCancelResponse> => {
    const request = {
      order_id:orderId
    }
    return (await this.api_query<OrderCancelResponse>("order_cancel", request))
  }

  stopMarketOrderCreate = async (request:StopMarketOrderCreateRequest): Promise<StopMarketOrderCreateResponse> => {
    return (await this.api_query<StopMarketOrderCreateResponse>("stop_market_order_create", request))
  }

  stopMarketOrderCancel = async (parentOrderId:number|string): Promise<{}> => {
    const request = {
      parent_order_id:parentOrderId
    }
    return (await this.api_query<{}>("stop_market_order_cancel", request))
  }

  userOpenOrders = async (pair:Pair ): Promise<UserOpenOrdersResponse> => {
    return (await this.api_query<UserOpenOrdersResponse>("user_open_orders", {
      pair
    }))
  }

  userCancelledOrders = async (limit:number=100, offset:number=0): Promise<UserCancelledOrdersResponse> => {
    return (await this.api_query<UserCancelledOrdersResponse>("user_cancelled_orders", {
      limit, offset
    }))
  }

  userTrades = async (pair:Pair, limit:number=100, offset:number=0): Promise<UserTradesResponse> => {
    return (await this.api_query<UserTradesResponse>("user_trades", {
      pair:pair,
      limit:limit,
      offset:offset,
    }))
  }

  orderTrades = async (orderId:OrderId): Promise<OrderTradesResponse> => {
    return (await this.api_query<OrderTradesResponse>("order_trades", {
      order_id:orderId
    }))
  }

}
