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

const main = async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
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
    await browser.close();
}

main();
