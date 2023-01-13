"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./exmoApi/connection");
const credentials = {
    publicKey: 'K-cb8256d470499791f4cefcd54048db355c3d209f',
    secretKey: 'S-1088dc04cf45e29e8de798800fe3afe5ac017bdf'
};
const api = (0, connection_1.connect)(credentials);
const ms = Date.now();
const pair = 'USDT_USD';
const checker = async function () {
    //console.log(await api.candlesHistory(pair,ms.toString(), (ms-100000).toString() ))
    console.log((await api.currency()));
    console.log((await api.currencyListExtended()));
    console.log((await api.orderBook(pair)));
    console.log((await api.trades(pair)));
};
checker();
