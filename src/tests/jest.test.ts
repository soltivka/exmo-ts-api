import {describe, expect, test} from '@jest/globals';
import {connect} from "../exmoApi/connection";
const api = connect()
const time = Date.now()
const pair = 'USDT_USD'
describe('unauthorized api', () => {

  describe('orderBook', () => {
    const response = api.orderBook(pair)
    test('response defined', () => {
      return expect(response).toBeDefined()
    })
    test('', () => {
      return expect(response).resolves.toHaveProperty(pair)
    });
  })

  describe('currency', () => {
    const response = api.currency()
    test('response defined', () => {
      return expect(response).toBeDefined()
    })
    test('contain currencies', () => {
      return expect(response).resolves.toContain('BTC')
    });
    test('contain currencies', () => {
      return expect(response).resolves.toContain('USD')
    });
    test('array returned', () => {
      return expect(response).resolves.toBeInstanceOf(Array)
    });

  })

  describe('currency-list-extended', () => {
    const response = api.currencyListExtended()
    test('response defined', () => {
      return expect(response).toBeDefined()
    })


  })

});

