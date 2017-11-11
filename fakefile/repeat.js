const wrapper = require('./wrapper');

function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it... " + session.userData.name +
                    " you've been programming for " + session.userData.coding +
                    " years and use " + session.userData.language + ".");
        builder.Prompts.number(session, "Great!, How many days do you consider to be long-term?");
}

function (session, results) {
        session.userData.longterm = results.response.entity;
        session.send("Got it... ");
        builder.Prompts.number(session, "How many days do you consider to be short-term?");
}

function (session, results) {
        session.userData.shortterm = results.response.entity;
        session.send("Got it... ");
        builder.Prompts.number(session, "How much % of a cushion do you want before we make a purchase?");
}

function (session, result) {
        session.userData.cushion = results.response.entity/100;
        session.send("Alright! just one more question and I'll take care of the rest!");
        builder.Prompts.number(session, "How many shares would you like?");
}

function observe(days) {
  // stuff you want to happen right away
  return wrapper.getprice(session.userData.symbol, session.userData.longterm);
}

function compare(short, long){
  wrapper.movingAverage("FB",short,(averageS) => {
    wrapper.movingAverage("FB",long, (averageL) => {
      return(averageS > averageL*(1 + session.userData.cushion
    }
  }
}

function (session, result) {
  session.userData.shares = results.response.entity;
  var short = 0;
  var long = 0;

  while(!compare(session.userData.short, session.userData.long)){

  }
    wrapper.movingAverage("FB",300,(average1) => {
      wrapper.movingAverage("FB",600, (average2) => {
        if(average1>average2){
    //do something
    }
  }
}

    setTimeout(compare(short, long), 14400000);
  }

}
