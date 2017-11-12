/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
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

var Portfolio = require("./portfolio");
var port1 = new Portfolio();

//Import wrapper
const wrapper = require('./wrapper.js');
/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot.
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Let's begin to setup your trading strategy: Moving Average Algorithm. Which Stock Symbole you want to trade?");
    },

    function (session,results) {
        session.userData.symbol = results.response;
        session.send("I will monitor your short term and long term moving average days.");
        builder.Prompts.number(session, "What's your longterm moving average days?");
    },

    function (session, results) {
        session.userData.longterm = results.response;
        session.send("Got it..."+session.userData.longterm);
        builder.Prompts.number(session, "What's your short term moving average days?");
    },

    function (session, results) {
        session.userData.shortterm = results.response;
        session.send("Got it..."+session.userData.shortterm);
        builder.Prompts.number(session, "What percentage of your moving avereage days you want your support to be?");
    },

    function (session, result) {
        //session.userData.support = results.response;
        //session.send("Alright!"+session.userData.support+" just one more question and I'll take care of the rest!");
        builder.Prompts.number(session, "How many shares would you want to execute?");
    },

    function(session,results) {
      wrapper.movingAverage(session.userData.symbol,session.userData.longterm,(averagelong) => {
      wrapper.movingAverage(session.userData.symbol,session.userData.shortterm, (averageshort) => {
        //do while later
        //(1-session.userData.support)*averagelong=>(wrapper.movingAverage(session.userData.symbol,1,(RealTimePrice)=>{})))
        if(averagelong>averageshort) {
          builder.Prompts.text(session, "Buy!");
          port1.buy(symbol, 10, 1);
          port1.log_portfolio();
        }
        else builder.Prompts.text(session, "Do Nothing for now..");
      })
      })
    }
]);
