const puppeteer = require('puppeteer');
var path = require('path');

const printBasic = async function (firstName, lastName, email, size, pageSize) {
  let address = 'file:///' + path.resolve(__dirname, "build/basic/index.html");
  address = address + `?size=${size}&pageSize=${pageSize}`;
  address = address + `?firstName=${firstName}&lastName=${lastName}&email=${email}`;
  puppeteer.connect({ 
    browserWSEndpoint: `ws://0.0.0.0:8080`,
    ignoreHTTPSErrors: true
  }).then(async browser => {
    console.log(firstName, lastName, email, size, pageSize)
    const page = await browser.newPage();
    await page.goto(address, { waitUntil: 'networkidle0' });
    let editArray = [];
    [['firstName', firstName], ['lastName', lastName], ['email', email]].forEach(async e => {
      editArray.push(page.evaluate((div_id, div_content) => {
        const element = document.querySelector(`#${div_id}`)
        try { element.innerHTML = div_content } catch { }
        return element
      }, e[0], e[1]))
    })
    const resolvedfinalArray = await Promise.all(editArray); // resolving all promises
    const result = await page.pdf({ path: `./result.pdf`, format: 'A4' });
    await page.close();
    await browser.disconnect();
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  printBasic
}