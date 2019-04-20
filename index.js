const pm2 = require('pm2');
// const { apps } = require('./ecosystem.config');
var request = require('request');



function doStuff() {
    console.log('Walking east one step');
    setTimeout(function () {
      request.post({
          url: 'http://localhost:2000?size=card&pageSize=A4',
          form: {
              firstname: 'Hello',
              lastname: 'worls',
              email: 'really hope this works'
          }
      }, function (err, httpResponse, body) {
          console.log(err);
          // console.log(httpResponse);
          // console.log(body);
      })
    }, 1000);
 }
 setInterval(doStuff, 500);