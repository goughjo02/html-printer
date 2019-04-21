const pm2 = require('pm2');
// const { apps } = require('./ecosystem.config');
// var request = require('request');



async function doPrint() {
    console.log('Doing print');
    await pm2.connect(async function(err) {
        if (err) {
          console.error(err);
          process.exit(2);
        }
        console.log('Connected')
        await pm2.start({
          script    : 'app.js',         // Script to be run
          exec_mode : 'cluster',        // Allows your app to be clustered
          instances : 1,                // Optional: Scales your app by 4
          max_memory_restart : '100M',   // Optional: Restarts your app if it reaches 100Mo
          args: "--size card --pageSize a4 --firstName Donald --lastName Duck --email donnyd@feathermail.com"
        }, function(err, apps) {
          console.log('started');
          pm2.disconnect();   // Disconnects from PM2
          if (err) throw err
        });
      });
      
 }


 doPrint();
