const https = require('https');

/**
 * @class AlphavantageAPI
 * @desc Wraps up the Alphavantages API
 */
class AlphavantageAPI {
  /**
   * @constructor
   */
  constructor() {
    this.https = https;
  }

  get(query) {
    return this.https.get(query);
  }

  getPrice(symbol, range = 'TIME_SERIES_INTRADAY', interval = '1m', apikey = '8KRR11RTKBQL4NK0'){

    const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=1min&apikey=8KRR11RTKBQL4NK0";

    var end;
    https.get(URL, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        end = JSON.parse(data);
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    return end;
  }
}

var test = new AlphavantageAPI();
console.log(test.getPrice("FB"));

module.exports = AlphavantageAPI;
