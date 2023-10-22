import {describe, expect, test} from '@jest/globals';
import {ExmoApi} from "../exmoApi/exmo_api";

const api = new ExmoApi()
const time = Math.round(Date.now() / 1000)
const pair = 'BTC_USD'


describe('unauthorized api', () => {

  describe('orderBook', () => {
    const response = api.orderBook(pair)
    test('response defined', () => {
      return expect(response).toBeDefined()
    })
    test('has given pair', () => {
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
    test('array returned', () => {
      return expect(response).resolves.toBeInstanceOf(Array)
    });
    test('contain currencies', () => {
      const expected = {description: 'US Dollar', name: 'USD'}
      return expect(response).resolves.toEqual(
        expect.arrayContaining([      // 2
          expect.objectContaining(expected)
        ])
      )
    });
  });

  describe('candles history', () => {
    const response = api.candlesHistory(pair, (time - 3600 * 10).toString(), time.toString(), '60')
    test('response defined', () => {
      return expect(response).toBeDefined()
    })
    test('array returned', () => {
      return expect(response).resolves.toBeInstanceOf(Object)
    });
    test('contain candles', async () => {
      const data = await response
      if ("s" in data) {
        return expect(data.s).toBe('no_data')
      } else {
        return expect(data.candles).toBeInstanceOf(Array)
      }
    });
  })

  describe('pair settings', () => {
    const response = api.pairSettings(pair)
    test('response defined', () => {
      return expect(response).toBeDefined()
    })
    test('has given pair', () => {
      return expect(response).resolves.toHaveProperty('min_quantity')
    });
  })

  describe('trades', () => {
    const response = api.trades(pair)
    test('response defined', () => {
      return expect(response).toBeDefined()
    })
    test('has given pair', () => {
      return expect(response).resolves.toHaveProperty(pair)
    });

    test('info about pair is array', async () => {
      const data = await response
      return expect(data[pair]).toBeInstanceOf(Array)
    })
  })

  describe('ticker', () => {
    const response = api.ticker(pair)
    test('response defined', async () => {
      const data = await response
      return expect(data).toBeDefined()
    })
    test('has given pair', async () => {
      const data = await response
      return expect(data).toBeDefined()
    })
    test('info about pair is array', async () => {
      const data = await response
       expect(data).toBeInstanceOf(Object)
    })
  })

  describe('required amount', () => {
    const quantity = '10'
    const response = api.requiredAmount(pair, quantity)
    test('response defined', async () => {
      const data = await response
      return expect(data).toBeDefined()
    })
    test('is object', async () => {
      const data = await response
      return expect(data).toBeInstanceOf(Object)
    })
    test('is object', async () => {
      const data = await response
      return expect(data.quantity).toBe(quantity)
    })
    test('is correct', async () => {
      const data = await response
      expect(data.quantity).toBe(quantity)
    })
  })

  describe('payment providers', () => {
    const response = api.paymentProviderCryptoList()
    test('response defined', async () => {
      const data = await response
      return expect(data).toBeDefined()
    })
    test('response is object', async () => {
      const data = await response
      return expect(data).toBeInstanceOf(Object)
    })
    test('has currencies', async () => {
      const data = await response
      expect(data).toHaveProperty('BTC')
      expect(data).toHaveProperty('BCH')
    })
  })
});

