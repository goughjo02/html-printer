const io = require('@pm2/io');
const express = require('express');
var serveStatic = require('serve-static');
// var path = require('path');
const puppeteer = require('puppeteer');
const httpProxy = require("http-proxy");
const host = "0.0.0.0";
const port = 8080;
async function createServer(WSEndPoint, host, port) {
  await httpProxy
    .createServer({
      target: WSEndPoint, // where we are connecting
      ws: true,
      localAddress: host // where to bind the proxy
    })
    .listen(port); // which port the proxy should listen to
  return `ws://${host}:${port}`; // ie: ws://123.123.123.123:8080
}
new class Browser extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {
    const app = express();
    this.browser = await puppeteer.launch();
    const pagesCount = (await this.browser.pages()).length;
    const browserWSEndpoint = this.browser.wsEndpoint();
    const customWSEndpoint = await createServer(browserWSEndpoint, host, port);
    console.log({ browserWSEndpoint, customWSEndpoint, pagesCount });
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
