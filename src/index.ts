import {Pair, Price, Quantity} from "./types/types";
import {OrderCreateRequest, OrderType} from "./types/requests";
import {ExmoApi} from "./exmoApi/exmo_api";
const credentials = {
  publicKey:'K-cb8256d470499791f4cefcd54048db355c3d209f',
  secretKey:'S-1088dc04cf45e29e8de798800fe3afe5ac017bdf',
}
const api = new ExmoApi()
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
