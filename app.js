const io = require('@pm2/io')
const app = require('express')()
const puppeteer = require('puppeteer');

const port = 2000

console.log('whats up');

new class MyApp extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {
    console.log('hello');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    var test = function () {
      return "test tring";
    }
    await page.goto('file:///Users/joe/NodeApplications/html-printer/build/index.html', { waitUntil: 'networkidle0' });
    const http = require('http').Server(app)
    app.get('/', async (req, res) => {
      this.reqMeter.mark()
      await page.goto('file:///Users/joe/NodeApplications/html-printer/build/index.html', { waitUntil: 'networkidle0' });

      const body = await page.evaluate(() => {
        document.querySelector('#root').innerHTML = 'editted text';
      });
      await page.pdf({ path: 'result.pdf', format: 'A4' });
      res.send('Hello From Entrypoint.js')
    });

    this.server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`)
      cb()
    })
  }

  // This is the very last method called on exit || uncaught exception
  onStop(err, cb, code, signal) {
    console.log(`App has exited with code ${code}`)
  }

  // Here we declare some process metrics
  sensors() {
    this.reqMeter = this.io.meter('req/min')
  }

  // Here are some actions to interact with the app in live
  actuators() {
    this.io.action('getEnv', (reply) => {
      reply({ server: this.server })
    })
  }
}