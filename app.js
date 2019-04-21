const io = require('@pm2/io')
const puppeteer = require('puppeteer');
var path = require('path');
const args = require('yargs').argv;

// Get the address which will be visited with puppeteer
const basic_html = "build/basic.html";
let address = 'file:///' + path.resolve(__dirname, basic_html);
// Note this could be quicker if there is a httpserver and puppetteer can visit using the connect() method
// let address = 'http://http://localhost:3000';
// Append query parametes
const expected_fields = [
  'size',
  'pageSize',
  'firstName',
  'lastName',
  'email'
]
address = address + `?size=${args.size}&pageSize=${args.pageSize}`;
expected_fields.forEach(e => {
  address = address + `${e}=${args[e]}&`
})


new class BasicPrinter extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {
    this.browser = await puppeteer.launch();
    const page = await this.browser.newPage();
    await page.goto(address, { waitUntil: 'networkidle0' });
    let editArray = [];
    expected_fields.forEach(async e => {
      editArray.push(page.evaluate((div_id, div_content) => {
        const element = document.querySelector(`#${div_id}`)
        try {element.innerHTML = div_content} catch {}
        return element
      }, e, args[e]))
    })
    const resolvedfinalArray = await Promise.all(editArray); // resolving all promises
    const result = await page.pdf({ path: `./result.pdf`, format: 'A4' });
    await page.close();
    await this.browser.close();
    cb()
  }

  // This is the very last method called on exit || uncaught exception
  onStop(err, cb, code, signal) {
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
