var restify = require('restify');
var converterClass = require('./converter')
var exchangeRatesClient = require('./exchangeRatesClient')
var morgan = require('morgan')

var server = restify.createServer();
server.use(restify.plugins.queryParser());

var myConverter = new converterClass(exchangeRatesClient)

function convert(req, res, next){
    try{
        validateInput(req)

        let baseCurrency = req.params.baseCurrency.toUpperCase()
        let conversionCurrency = req.params.conversionCurrency.toUpperCase()
    
        myConverter.getConversion(req.params.date, baseCurrency, req.params.amount, conversionCurrency)
            .then(function (result) {
                res.send(result)
                next()
            }).catch(function (error) {
                res.send(error)
                next()
            })
    } catch (error){
        console.log(error)
        res.send(error)
    }
}

function validateInput(req) {
    if(!req.params.conversionCurrency){
        throw('Conversion currency missing')
    }
    if(!req.params.baseCurrency){
        throw('Base currency missing')
    }
    if(!req.params.date){
        throw('Date missing')
    }
    if(!req.params.amount){
        throw('Amount missing')
    }

}

server.get('/:baseCurrency/:conversionCurrency/:date/:amount', convert)

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
    morgan('test from morgan')
});

module.exports = server