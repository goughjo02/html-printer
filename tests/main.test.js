const pm2 = require('pm2');

beforeEach(async done => {
  const hello = await pm2.connect(function (err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start('../app.js', (err, apps) => {
      pm2.disconnect()
      if (err) { throw err }
    })
    done()
  })
  console.log('hello');
  console.log(hello);
});
afterEach(() => {
  pm2.disconnect();   // Disconnects from PM2
});

test('Start process" ', async (done) => {
  await pm2.start({
    name: 'test-process',
    script: 'app.js',         // Script to be run
    exec_mode: 'cluster',        // Allows your app to be clustered
    instances: 4,                // Optional: Scales your app by 4
    max_memory_restart: '100M',   // Optional: Restarts your app if it reaches 100Mo
  }, (err, apps) => {
    // done()
    console.log(err)
    // pm2.disconnect()
    if (err) { throw err }
  })
  // await pm2.start({
  //   script: 'app.js',         // Script to be run
  //   exec_mode: 'cluster',        // Allows your app to be clustered
  //   instances: 4,                // Optional: Scales your app by 4
  //   max_memory_restart: '100M'   // Optional: Restarts your app if it reaches 100Mo
  // }, (err, apps) => {
  //   done()
  //   console.log(err)
  //   pm2.disconnect()
  //   if (err) { throw err }
  // })
  expect(true).toBe(true);
  done()
});
