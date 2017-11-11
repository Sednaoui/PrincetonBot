const wrapper = require('./wrapper');

function callWrapper(){
  wrapper.movingAverage("FB",300,(average) => {
    console.log(average);
  })
}
callWrapper();
