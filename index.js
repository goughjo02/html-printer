const pm2 = require('pm2');
// const { apps } = require('./ecosystem.config');
// var request = require('request');



async function doStuff() {
    console.log('Doing stuff');
    await pm2.connect(async function(err) {
        if (err) {
          console.error(err);
          process.exit(2);
        }
        console.log('Connected')
        await pm2.start({
          script    : 'puppeteer-print.js',         // Script to be run
          exec_mode : 'cluster',        // Allows your app to be clustered
          instances : 4,                // Optional: Scales your app by 4
          max_memory_restart : '100M'   // Optional: Restarts your app if it reaches 100Mo
        }, function(err, apps) {
          pm2.disconnect();   // Disconnects from PM2
          if (err) throw err
        });
      });
      
 }


 doStuff();
