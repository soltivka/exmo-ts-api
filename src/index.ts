import {connect} from "./exmoApi/connection";
import {Pair, Price, Quantity} from "./types/types";
import {OrderCreateRequest, OrderType} from "./types/requests";

const api = connect()
const pair = 'BTC_USD'
const time = Math.round(Date.now()/1000)
const order:OrderCreateRequest = {
  pair: 'USDT_USD',
  quantity: '10',
  price: '0.8',
  type: 'buy',
  client_id:10500,
}

const pairSettings = api.pairSettings('USDT_USD')
pairSettings.then((data)=>{console.log(data)})
const response = api.orderCreate(order)
response.then((data)=>{console.log(data)})
