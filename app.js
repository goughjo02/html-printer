const io = require('@pm2/io')
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const app = require('express')()
app.use(bodyParser.urlencoded({
  extended: true
}));
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
        const { body } = req;
        for (var key of Object.keys(body)) {
            if (body.hasOwnProperty(key)) {
              const edit_element = await page.evaluate((pagekey, urlbody) => {
                const element = document.querySelector(`#${pagekey}`)
                try {
                  element.innerHTML = urlbody[pagekey]
                } catch(err) {
                  console.log(err)
                }
                console.log(element)
                console.log(element)
                console.log(pagekey + " = " + urlbody[pagekey]);
                return element
                // return pagekey + " = " + urlbody[pagekey];
              }, key, body);
              console.log(edit_element)
            }
        }
        // for (let key in query) {
        //   if (!query.hasOwnProperty(key)) {
        //       continue;
        //   }
        //   if (query.hasOwnProperty(key)) {
        //     const body = await page.evaluate(() => {
        //       const element = document.querySelector(`#${key}`)
        //       console.log(element)
        //       console.log(element)
        //       console.log(key + " = " + query[key]);
        //     });
            
        //   }
        // }
        await page.goto(url, { waitUntil: 'networkidle0' });
        // const body = await page.evaluate(() => {
        //   document.querySelector('#root').innerHTML = 'editted text';
        // });
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
