const pm2 = require('pm2');
const { apps } = require('./ecosystem.config');


pm2.start(apps[0], function (err, app) {
    if (err) {
        console.error(err);
        return pm2.disconnect();
    }
    console.log('Process app.js has been started');
});

// pm2.delete('all', function (err) {
//     if (err) {
//         console.error(err);
//         pm2.start(apps[0], function (err, app) {
//             if (err) {
//                 console.error(err);
//                 return pm2.disconnect();
//             }
//             console.log('Process app.js has been started');
//         });
//     }
//     pm2.start(apps[0], function (err, app) {
//         if (err) {
//             console.error(err);
//             return pm2.disconnect();
//         }
//         console.log('Process app.js has been started');
//     });
//     // pm2.restart('app.js', function (err, app) {
//     //     if (err) {
//     //         console.error(err);
//     //         return pm2.disconnect();
//     //     }
//     //     console.log('Process Restarted');
//     //     return pm2.disconnect();
//     // });
// });

var step;
for (step = 0; step < 5; step++) {
    // Runs 5 times, with values of step 0 through 4.
    console.log('Walking east one step');
}

// console.log(instance)