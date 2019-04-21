const io = require('@pm2/io');
const express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
const port = 3000

new class BasicPrinter extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {  
        const app = express();
        app.use(serveStatic('build', {'index': ['basic.html', 'basic.htm']}))
        this.server =  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  }

  // This is the very last method called on exit || uncaught exception
  onStop(err, cb, code, signal) {
      this.server.close();
    console.log(`App has exited with code ${code}`)
  }

  // Here we declare some process metrics
  sensors() {
    this.reqMeter = this.io.meter('req/min');
  }

  // Here are some actions to interact with the app in live
  actuators() {
    this.io.action('getEnv', (reply) => {
      reply({ server: this.server })
    })
  }
}
