"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExmoApi = void 0;
const CryptoJS = __importStar(require("crypto-js"));
const axios_1 = __importDefault(require("axios"));
class ExmoApi {
    constructor(credentials) {
        this._url = 'https://api.exmo.com/v1/';
        this.sign = (message) => {
            return CryptoJS.HmacSHA512(message, this._credentials.secretKey).toString(CryptoJS.enc.Hex);
        };
        this.api_query = async (method_name, data = {}, method = 'POST') => {
            data["nonce"] = Math.floor(new Date().getTime());
            const post_data = new URLSearchParams(data).toString();
            const url = this._url + method_name;
            const options = {
                method: method,
                url: url,
                headers: {
                    'Key': this._credentials.publicKey,
                    'Sign': this.sign(post_data),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: new URLSearchParams(data)
            };
            const result = (await (0, axios_1.default)(url, options)).data;
            return result;
        };
        //Public API
        this.trades = async (pair) => {
            if (pair instanceof Array) {
                return (await this.api_query("trades", { pair: pair.join(',') }));
            }
            return (await this.api_query("trades", { pair: pair }));
        };
        /**Limit -  the number of displayed positions (default: 100, max: 1000)*/
        this.orderBook = async (pair, limit) => {
            const request = {};
            request.pair = pair;
            if (pair instanceof Array) {
                request.pair = pair.join(',');
            }
            if (limit) {
                request.limit = limit;
            }
            console.log(request.pair);
            return (await this.api_query("order_book", request));
        };
        this.ticker = async (pair) => {
            const response = (await this.api_query("ticker"));
            if (!pair) {
                return response;
            }
            if (pair instanceof Array) {
                return pair.reduce((prev, curr) => {
                    return { ...prev, [curr]: response[curr] };
                }, {});
            }
            return { [pair]: response[pair] };
        };
        this.pairSettings = async (pair) => {
            const response = (await this.api_query("pair_settings"));
            if (!pair) {
                return response;
            }
            if (pair instanceof Array) {
                return pair.reduce((prev, curr) => {
                    return { ...prev, [curr]: response[curr] };
                }, {});
            }
            return { [pair]: response[pair] };
        };
        this.currency = async () => {
            return (await this.api_query("currency"));
        };
        this.currencyListExtended = async () => {
            return (await this.api_query("currency/list/extended", undefined, 'GET'));
        };
        this.requiredAmount = async (pair, quantity) => {
            const request = {
                pair: pair,
                quantity: quantity,
            };
            return (await this.api_query("required_amount", request));
        };
        this.candlesHistory = async (pair, from, to, resolution = '30') => {
            const request = {
                symbol: pair,
                resolution: resolution,
                from: from,
                to: to,
            };
            return (await this.api_query("required_amount", request, 'GET'));
        };
        this.paymentProviderCryptoList = async (pair, from, to, resolution) => {
            return (await this.api_query("payments_providers_crypto_list", undefined, 'GET'));
        };
        this._credentials = credentials;
    }
}
exports.ExmoApi = ExmoApi;
