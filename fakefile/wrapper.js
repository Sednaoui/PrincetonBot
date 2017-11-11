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

  getPrice(symbol,callback, range = 'TIME_SERIES_INTRADAY', interval = '15m', apikey = '8KRR11RTKBQL4NK0'){

    const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=15min&apikey=8KRR11RTKBQL4NK0";

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
        callback(end);

      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    return end;
  }
}

var test = new AlphavantageAPI();

test.getPrice("FB",(data)=>{
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      for (var point in data[key]) {
        if(data[key].hasOwnProperty(point)){
          for (var any in data[key][point]) {

              console.log(point + ": " + any + " -> " + data[key][point][any]);
              dummy = data[key][point][any];

          }
        }
      }
    }
}
});


module.exports = AlphavantageAPI;
