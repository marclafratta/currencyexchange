const expect = require('chai').expect;

const converter = require('../converter')
const mockClient = require('../exchangeRatesClientMock')

describe('mocked out USD to CAD', () => {
    it('Checks basic mocked response', (done) => {
        let myConverter = new converter(mockClient)

        myConverter.getConversion("2017-06-03", "USD", 100, "CAD")
        .then(function (result) {
            expect(typeof result).to.equal('object')
            expect(result.date).to.equal('2017-06-03')
            expect(result.base_currency).to.equal('USD')
            expect(result.base_amount).to.equal(100)
            expect(result.conversion_currency).to.equal('CAD')
            expect(result.conversion_amount).to.equal(135.2322)
            done()
        }).catch(function (error) {
            done(error)
        })
    });
}); 

describe('mocked out USD to JPY', () => {
    it('Checks basic mocked response', (done) => {
        let myConverter = new converter(mockClient)

        myConverter.getConversion("2018-01-09", "USD", 150.23, "JPY")
            .then(function (result) {
                expect(typeof result).to.equal('object')
                expect(result.date).to.equal('2018-01-09')
                expect(result.base_currency).to.equal('USD')
                expect(result.base_amount).to.equal(150.23)
                expect(result.conversion_currency).to.equal('JPY')
                expect(result.conversion_amount).to.equal(16744.0087)
                done()
            }).catch(function (error) {
                done(error)
            })
    });
}); 