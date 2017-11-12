

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

    getPrice(symbol, callback, range = 'TIME_SERIES_DAILY', outputsize = 'full', apikey = '8KRR11RTKBQL4NK0') {

        const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=8KRR11RTKBQL4NK0";
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


//this function shall be exprted. This mainly //need to define days // the caller defines it here it
function movingAverage(symbol, days, callback) {
    test = new AlphavantageAPI();
    test.getPrice(symbol, (data) => {
        let timeSeriesData = data['Time Series (Daily)'];
        let timeSeriesDataOpen = [];
        //this goes through all keys and fetches their object
        for (var key in timeSeriesData) {
            let timeSeriesObject = timeSeriesData[key];
            //this object has the properties wanted - '4. close' and so on
            timeSeriesDataOpen.push(parseFloat(timeSeriesObject['4. close']));
        }
        let sum = 0;
        for (i = 0; i < days; i++) {
            sum += timeSeriesDataOpen[i];
        }
        var average = sum / days;
        callback(average);
    });
}

function currentClosing(symbol, callback) {
    api = new AlphavantageAPI();
    api.getPrice(symbol, (data) => {
        let timeSeriesData = data['Time Series (Daily)'];
        let lastRefreshed = data['Meta Data']["3. Last Refreshed"];

        let res = timeSeriesData[lastRefreshed]["4. close"];

        callback(res);
    });
}

function latest(symbol, callback) {
    test = new AlphavantageAPI();
    test.getPrice(symbol, (data) => {
        let timeSeriesData = data['Time Series (Daily)'];
        let timeSeriesDataOpen = [];
        //this goes through all keys and fetches their object
        for (var key in timeSeriesData) {
            let timeSeriesObject = timeSeriesData[key];
            //this object has the properties wanted - '4. close' and so on
            timeSeriesDataOpen.push(parseFloat(timeSeriesObject['4. close']).toFixed(2));
        }
        latest = timeSeriesDataOpen[0];
        callback(latest);
    });
}

/* Example of call to wrapper
currentClosing("FB", (data)=>{
  console.log(data);
});
*/

module.exports = {
    AlphavantageAPI,
    movingAverage,
    currentClosing
};
