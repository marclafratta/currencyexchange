exports.getConversion = function(date, baseCurrency, baseAmount, conversionCurrency, coversionService){
    
    return {
        date: "2017-06-03",
        base_currency: "USD",
        base_amount: 100,
        conversion_currency: "CAD",
        conversion_amount: 135.23
    }
}

module.exports = class CurrencyConverter{
    constructor(exchangeRatesClient){
        this.exchangeRatesClient = exchangeRatesClient
    }

    getConversion(date, baseCurrency, baseAmount, targetCurrency) {
        //console.log('in conversion')    
        //console.log(this.exchangeRatesClient)
        let client = this.exchangeRatesClient
        return new Promise(function (resolve, reject) {
            //console.log(client)
            client.getRatio(baseCurrency, targetCurrency, date)
            .then(function (ratio) {   
                //console.log('ratio ' + ratio + ' base amount ' + baseAmount)
                let targetAmount = baseAmount * ratio
                targetAmount = +targetAmount.toFixed(4)
                resolve({
                    date: date,
                    base_currency: baseCurrency,
                    base_amount: parseFloat(baseAmount),
                    conversion_currency: targetCurrency,
                    conversion_amount: targetAmount
                })
            })
        })
    }
}


