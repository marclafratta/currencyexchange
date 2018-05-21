let liveResults = {
    "base": "USD",
    "date": "2017-06-02",
    "rates": {
        "AUD": 1.3526789694,
        "BGN": 1.743603459,
        "BRL": 3.2368726041,
        "CAD": 1.3523223678,
        "CHF": 0.9711152715,
        "CNY": 6.8206294018,
        "CZK": 23.5000445752,
        "DKK": 6.6320763127,
        "GBP": 0.7779976821,
        "HKD": 7.7929036284,
        "HRK": 6.6072033521,
        "HUF": 274.9843986806,
        "IDR": 13311.0011589552,
        "ILS": 3.5604885442,
        "INR": 64.4428100205,
        "JPY": 111.4558259784,
        "KRW": 1123.2504234644,
        "MXN": 18.6308282072,
        "MYR": 4.2804671481,
        "NOK": 8.4619773558,
        "NZD": 1.4095569225,
        "PHP": 49.5257198895,
        "PLN": 3.7376303825,
        "RON": 4.0699830614,
        "RUB": 56.5767139164,
        "SEK": 8.6861906035,
        "SGD": 1.3864669698,
        "THB": 34.1499509673,
        "TRY": 3.5304448605,
        "USD": 1,
        "ZAR": 12.8703753232,
        "EUR": 0.8915039672
    }
}


let getLiveResults = function (base, date) {
    return liveResults
}

exports.setLiveResults = function (mockLiveResults) {
    liveResults = mockLiveResults
}

exports.getRatio = function (baseCurrency, targetCurrency, date) {
    return new Promise(function (resolve, reject) {
        resolve(liveResults.rates[targetCurrency])
    })
}