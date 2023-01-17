import {connect} from "./exmoApi/connection";

const api = connect()
const pair = 'USDT_USD'


api.orderBook(pair).then((response)=>{
  console.log(response)
})