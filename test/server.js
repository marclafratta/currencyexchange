const chai = require('chai')
const expect = require('chai').expect;
const should = chai.should()
const chaiHttp = require('chai-http')
const nock = require('nock');

const converter = require('../converter')
const server = require('../server')

const usd2011_06_03 = require('./apiResponses/usd2011-06-03')
const gbp2007_07_12 = require('./apiResponses/gbp2007-07-12')
const eur2004_08_07 = require('./apiResponses/eur2004-08-07')
const zar2017_02_09 = require('./apiResponses/zar2017-02-09')

chai.use(chaiHttp)

describe('2011-06-03 USD to CAD', () =>{
    beforeEach(() => {
        nock('https://exchangeratesapi.io')
            .get('/api/2011-06-03?base=USD')
            .reply(200, usd2011_06_03)
    })

    it('Gets conversion USD to CAD on 2011-06-03', (done) => {
        chai.request(server)
            .get('/USD/CAD/2011-06-03/100')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.deep.equal({
                    "date": "2011-06-03",
                    "base_currency": "USD",
                    "base_amount": 100,
                    "conversion_currency": "CAD",
                    "conversion_amount": 97.85
                })
                done()       
            })
    })
})

describe('2007-07-12 GBP to SEK', () => {
    beforeEach(() => {
        nock('https://exchangeratesapi.io')
            .get('/api/2007-07-12?base=GBP')
            .reply(200, gbp2007_07_12)
    })

    it('Gets conversion GBP to SEK on 2007-07-12', (done) => {
        chai.request(server)
            .get('/GBP/SEK/2007-07-12/303')
            .end((err, res) => {
                //console.log(res.text)
                expect(res.body).to.deep.equal({
                    "date": "2007-07-12",
                    "base_currency": "GBP",
                    "base_amount": 303,
                    "conversion_currency": "SEK",
                    "conversion_amount": 4085.0157
                })
                done()
            })
    })
})

describe('2004-08-07 EUR to PLN', () => {
    beforeEach(() => {
        nock('https://exchangeratesapi.io')
            .get('/api/2004-08-07?base=EUR')
            .reply(200, eur2004_08_07)
    })

    it('Gets conversion EUR to PLN on 2004-08-07', (done) => {
        chai.request(server)
            .get('/EUR/PLN/2004-08-07/5')
            .end((err, res) => {
                expect(res.body).to.deep.equal({
                    "date": "2004-08-07",
                    "base_currency": "EUR",
                    "base_amount": 5,
                    "conversion_currency": "PLN",
                    "conversion_amount": 22.01
                })
                done()
            })
    })
})

describe('2004-08-07 EUR to PLN', () => {
    beforeEach(() => {
        nock('https://exchangeratesapi.io')
            .get('/api/2017-02-09?base=ZAR')
            .reply(200, zar2017_02_09)
    })

    it('Gets conversion ZAR to TRY on 2017-02-09', (done) => {
        chai.request(server)
            .get('/ZAR/TRY/2017-02-09/132')
            .end((err, res) => {
                expect(res.body).to.deep.equal({
                    "date": "2017-02-09",
                    "base_currency": "ZAR",
                    "base_amount": 132,
                    "conversion_currency": "TRY",
                    "conversion_amount": 36.3528
                })
                done()
            })
        
    })
    it('capitalizes currency symbols for ZAR to TRY on 2017-02-09', (done) => {
        chai.request(server)
            .get('/zar/try/2017-02-09/132')
            .end((err, res) => {
                expect(res.body).to.deep.equal({
                    "date": "2017-02-09",
                    "base_currency": "ZAR",
                    "base_amount": 132,
                    "conversion_currency": "TRY",
                    "conversion_amount": 36.3528
                })
                done()
            })

    })
    
})

describe('data validation ',() => {
    it('rejects request with empty base currency', (done) =>{
        chai.request(server)
            .get('//TRY/2017-02-09/132')
            .end((err,res) => {
                expect(res.body).to.equal('Base currency missing')
            })
            done()
    })
    it('rejects request with empty conversion currency', (done) => {
        chai.request(server)
            .get('/TRY//2017-02-09/132')
            .end((err, res) => {
                expect(res.body).to.equal('Conversion currency missing')
            })
        done()
    })
    it('rejects request with empty date ', (done) => {
        chai.request(server)
            .get('/TRY/USD//132')
            .end((err, res) => {
                expect(res.body).to.equal('Date missing')
            })
        done()
    })
    it('rejects request with empty amount ', (done) => {
        chai.request(server)
            .get('/TRY/USD/2017-02-09/')
            .end((err, res) => {
                expect(res.body).to.equal('Amount missing')
            })
        done()
    })

})