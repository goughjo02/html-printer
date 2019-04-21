const pm2 = require('pm2');
// const { apps } = require('./ecosystem.config');

async function doPrint() {
    try {
      await pm2.connect(async function(err) {
          if (err) {
            console.error(err);
            process.exit(2);
          }
          try {
            await pm2.start({
              name: 'print job',
              script    : 'print.js',         // Script to be run
              exec_mode : 'cluster',        // Allows your app to be clustered
              instances : 1,                // Optional: Scales your app by 4
              max_memory_restart : '100M',   // Optional: Restarts your app if it reaches 100Mo
              args: "--size card --pageSize a4 --firstName Donald --lastName Duck --email donnyd@feathermail.com"
            }, function(err, apps) {
              pm2.stop('app.js');
              pm2.disconnect();
              if (err) throw err
            });
          } catch(err) {
            console.log('trouble starting app.js')
          }
        });
    } catch(err) {
      console.log('trouble connecting to pm2')
    }
 }


 doPrint();
