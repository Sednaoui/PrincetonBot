const wrapper = require('./wrapper.js');


wrapper.movingAverage("FB",300,(average1) => {
  wrapper.movingAverage("FB",600, (average2) => {
    if(average1>average2) {
      console.log("Hello");
    } else {
      console.log("bye");
    }
  })
})
