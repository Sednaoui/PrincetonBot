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

port1.log_portfolio();
port1.buy('FB', 10.5, 1);
port1.log_portfolio();
port1.sell('FB', 12, 1);
port1.log_portfolio();

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot.
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hello... What's your name?");
    },
    
    function (session, results) {
<<<<<<< HEAD
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?");
=======
        session.userData.longterm = results.response.entity;
        session.send("Got it... ");
        builder.Prompts.number(session, "How many days do you consider to be short-term?");
>>>>>>> a775dbf31baf8d29ea645e5b55ed3ea7a7bf39fc
    },

    function (session, results) {
        session.userData.shortterm = results.response.entity;
        session.send("Got it... ");
        builder.Prompts.number(session, "How much % of a cushion do you want before we make a purchase?");
    },

    function (session, result) {
        session.userData.cushion = results.response.entity/100.0;
        session.send("Alright! just one more question and I'll take care of the rest!");
        builder.Prompts.number(session, "How many shares would you like?");
    }
]);
