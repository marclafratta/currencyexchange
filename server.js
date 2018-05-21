var restify = require('restify');
var converterClass = require('./converter')
var exchangeRatesClient = require('./exchangeRatesClient')

function respond(req, res, next) {
    console.log(req.query)
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
server.use(restify.plugins.queryParser());

var myConverter = new converterClass(exchangeRatesClient)

function convert(req, res, next){
    myConverter.getConversion(req.query.date, req.params.baseCurrency, req.query.amount, req.params.conversionCurrency)
        .then(function (result) {
            res.send(result)
            next()
        })
}

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.get('/convert/:baseCurrency/:conversionCurrency/', convert)

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server