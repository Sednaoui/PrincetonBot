/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Make a portfolio

const Portfolio = require('./portfolio.js');


//Import wrapper
const wrapper = require('./wrapper.js');
/*----------------------------------------------------------------------------------------
 * Bot Storage: This is a great spot to register the private state storage for your bot.
 * We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
 * For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
 * ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
var port1 = new Portfolio();

port1.buy('FB',178.4,200);
bot.dialog('/', [
    function(session) {
        builder.Prompts.text(session, "Let's begin to setup your trading strategy: Moving Average Algorithm. Which Stock Symbole you want to trade?");
    },

    function(session, results) {
        session.userData.symbol = results.response;
        if(session.userData.symbol==='none') {

              builder.Prompts.text(session, "We sold your Facebook stocks, I made you some money!");
                port1.sell('FB', 178.4, 200); //hardcoded sorry
                builder.Prompts.text(session, port1.log_portfolio('FB'));

        }
        else {
        session.send("I will monitor your short term and long term moving average days.");
        builder.Prompts.number(session, "What's your longterm moving average days?");
      }
    },

    function(session, results) {
        session.userData.longterm = results.response;
        session.send("Got it..." + session.userData.longterm);
        builder.Prompts.number(session, "What's your short term moving average days?");

    },

    function(session, results) {
        session.userData.shortterm = results.response;
        session.send("Got it..." + session.userData.shortterm);
        builder.Prompts.number(session, "What percentage of your moving avereage days you want your support(floor) to be?");
    },

    function(session, results) {
        session.userData.support = results.response;
        builder.Prompts.number(session, "What percentage of your moving avereage days you want your resistance(ceiling) to be?");
    },
    function(session, results) {
        session.userData.resistance = results.response;
        //session.send("Alright!"+session.userData.support+" just one more question and I'll take care of the rest!");
        builder.Prompts.number(session, "How many shares would you want to execute?");
    },

    function(session, results) {
        session.userData.numshares = results.response
        wrapper.movingAverage(session.userData.symbol, session.userData.longterm, (averagelong) => {
            wrapper.movingAverage(session.userData.symbol, session.userData.shortterm, (averageshort) => {
                //do while later
                //(1-session.userData.support)*averagelong=>(wrapper.movingAverage(session.userData.symbol,1,(RealTimePrice)=>{})))


                /*do {
                  look up current stock price
              }
              //while (keep getting current stock price while we condition X )

              does that work??
              */
              wrapper.currentClosing(session.userData.symbol, (currentclosing) => {
                if ((averagelong > averageshort))
              //  ((1-session.userData.support)*(session.userData.averagelong)) >= currentclosing
              {
                        builder.Prompts.text(session, "Hey, we bought the stocks!");
                        port1.buy(session.userData.symbol, currentclosing, session.userData.numshares);
                        //console.log(MarketPrice);
                        builder.Prompts.text(session, port1.log_portfolio(session.userData.symbol));

                      //sell give me tyta sec
                } else if (averageshort > averagelong)
                        //(1-session.userData.resistance)*(session.userData.averageshort)) <= currentclosing
                {
                    builder.Prompts.text(session, "We sold them and believe me, we made you some money!");
                      //also quick question, why do you call buy twice in the function above?
                      port1.sell(session.userData.symbol, currentclosing, session.userData.numshares);
                      builder.Prompts.text(session, port1.log_portfolio(session.userData.symbol));
                }
              });
            })
        })
    }
]);
