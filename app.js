const io = require('@pm2/io')
const app = require('express')()
const puppeteer = require('puppeteer');
// settings
const port = 2000
const url = 'file:///Users/joe/NodeApplications/html-printer/build/index.html';


new class PrinterApp extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {
    const browser = await puppeteer.launch();
    app.get('/',
      async (req, res) => {
        this.reqMeter.mark()
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        const body = await page.evaluate(() => {
          document.querySelector('#root').innerHTML = 'editted text';
        });
        await page.pdf({ path: 'result.pdf', format: 'A4' });
        await page.close();
        res.send('Hello From Entrypoint.js')
      });
    this.server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
      cb();
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
