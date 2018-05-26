var axios = require('axios');

let getLiveResults = function(baseCurrency, date){
    return axios.get(`https://exchangeratesapi.io/api/${date}?base=${baseCurrency}`)
}

exports.getRatio = function (baseCurrency, targetCurrency, date) {
    return new Promise(function(resolve, reject){
        getLiveResults(baseCurrency, date).then(function (liveResults) {
            liveResults = liveResults.data
            //console.log(typeof(liveResults.rates))
            //console.log('target rate ' + targetCurrency + " " + liveResults.rates[targetCurrency] )
            resolve(liveResults.rates[targetCurrency])
        }).catch(function(){
            console.log('client error')
            reject("client error")
        })
    })
}
