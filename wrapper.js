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

  getPrice(symbol,callback, range = 'TIME_SERIES_INTRADAY', interval = '1m', apikey = '8KRR11RTKBQL4NK0'){

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
  //this fetches the part where you find the time series
  let timeSeriesData = data['Time Series (1min)'];
  let timeSeriesDataOpen = [];
  //this goes through all keys and fetches their object
  for (var key in timeSeriesData) {
    let timeSeriesObject = timeSeriesData[key];
    //this object has the properties wanted - '1. open' and so on
      timeSeriesDataOpen.push(parseFloat(timeSeriesObject['1. open']));
  }
  let sum = 0;
  for (i=0;i<timeSeriesDataOpen.length;i++) {
  sum+= timeSeriesDataOpen[i];
  console.log(i);
}
var average = sum/timeSeriesDataOpen.length;
  console.log(average);


});

module.exports = AlphavantageAPI;
