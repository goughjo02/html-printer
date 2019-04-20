const io = require('@pm2/io')
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const express = require('express')
// settings
const port = 2000
const url = 'file:///Users/joe/NodeApplications/html-printer/build/basic.html';


const app = new class PrinterApp extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {
    this.title = "My Printer App"
    this.browser = await puppeteer.launch();
    const page = await this.browser.newPage();
    this.app = express();
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    // This is the express root endpoint
    this.app.get('/', async (req, res) => {
      const page = await this.browser.newPage();
      const { body, query } = req;
      const { size, pageSize } = query;
      let address = `${url}?size=${size}&pageSize=${pageSize}`;
      for (var key of Object.keys(query)) {
        if (query.hasOwnProperty(key)) {
          continue;
        }
        address = address + `${key}=${query}&`
      }
      await page.goto(address, { waitUntil: 'networkidle0' });
      for (var key of Object.keys(body)) {
        if (body.hasOwnProperty(key)) {
          const edit_element = await page.evaluate(async (pagekey, urlbody) => {
            const element = document.querySelector(`#${pagekey}`)
            try {
              element.innerHTML = urlbody[pagekey]
            } catch (err) {
              return err
            }
            return element
          }, key, body);
          // console.log(edit_element)
        }
      }
      await page.pdf({ path: 'result.pdf', format: 'A4' });
      await page.close();
      res.send('Seems good')
    });
    this.server = this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
      cb();
    })
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

module.exports = {
  app
};
