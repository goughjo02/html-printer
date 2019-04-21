const io = require('@pm2/io')
// const pm2 = require('pm2');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const express = require('express')
// settings
const port = 2000
const url = 'file:///Users/joe/NodeApplications/html-printer/build/basic.html';


new class PrintJob extends io.Entrypoint {
  // This is the very first method called on startup
  async onStart(cb) {
    console.log('print starting');
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
