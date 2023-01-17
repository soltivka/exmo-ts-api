import {connect} from "./exmoApi/connection";

const api = connect()


api.currencyListExtended().then((response)=>{
  console.log(response)
})