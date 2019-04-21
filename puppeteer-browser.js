const io = require('@pm2/io')
const puppeteer = require('puppeteer');


new class PrinterApp extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {
    this.count = 0;
    this.title = "My Printer App"
    this.browser = await puppeteer.launch();
  }

  // This is the very last method called on exit || uncaught exception
  onStop(err, cb, code, signal) {
    this.browser.close();
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
