import {connect} from "./exmoApi/connection";

const api = connect()
const pair = 'BTC_USD'
const time = Math.round(Date.now()/1000)

const response = api.paymentProviderCryptoList()
response.then((data)=>{console.log(data)})