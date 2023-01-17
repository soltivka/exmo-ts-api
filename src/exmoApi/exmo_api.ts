import * as CryptoJS from "crypto-js";
import {Credentials, Limit, Pair, Quantity, Resolution, Time} from "../types/types";
import {PairRequest} from "../types/requests";
import dotenv from 'dotenv'
import {
  CandlesHistoryResponse,
  CurrencyListExtendedResponse,
  CurrencyResponse, ExmoResponse,
  OrderBookResponse,
  PairSettingsResponse, PaymentProviderCryptoListResponse, RequiredAmountResponse,
  TickerResponse,
  TradesResponse
} from "../types/responses";
import axios from "axios";


export class ExmoApi {
  private _credentials: Credentials
  private _url: string = 'https://api.exmo.com/v1.1/'

  constructor() {
    dotenv.config()
    this._credentials = {
      publicKey: process.env.EXMO_PUBLIC_KEY||'.env PUBLIC_KEY = not found',
      secretKey: process.env.EXMO_SECRET_KEY||'.env SECRET_KEY = not found'
    }
    console.log(this._credentials)
  }

  private sign = (message: string) => {
    return CryptoJS.HmacSHA512(message, this._credentials.secretKey).toString(CryptoJS.enc.Hex);
  }

  private api_query = async <T>(method_name: string, data: any = {}, method:'GET'|'POST'='POST', withoutBody:boolean = false): Promise<T> => {
    data["nonce"] = Math.floor(new Date().getTime())
    const post_data = new URLSearchParams(data).toString();
    const url = this._url + method_name;
    const options:any = {
      method: method,
      url:url,
      headers: {
        'Key': this._credentials.publicKey,
        'Sign': this.sign(post_data),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    if(withoutBody){
      delete options.data;
    }
    const result = (await axios(url, options)).data
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
    const response = await this.api_query<CurrencyListExtendedResponse>("currency/list/extended", {} ,'GET')
    return (response)
  }

  requiredAmount = async (pair: Pair, quantity: Quantity): Promise<RequiredAmountResponse> => {
    const request = {
      pair: pair,
      quantity: quantity,
    }
    return (await this.api_query<RequiredAmountResponse>("required_amount", request))
  }

  candlesHistory = async (pair: Pair, from: Time, to: Time, resolution: Resolution='30'): Promise<CandlesHistoryResponse> => {
    const request = {
      symbol: pair,
      resolution: resolution,
      from: from,
      to: to,
    }
    return (await this.api_query<CandlesHistoryResponse>("required_amount", request,'GET'))
  }

  paymentProviderCryptoList = async (pair: Pair, from: Time, to: Time, resolution?: Resolution): Promise<PaymentProviderCryptoListResponse> => {
    return (await this.api_query<PaymentProviderCryptoListResponse>("payments_providers_crypto_list", undefined, 'GET'))
  }

}