# html-printer

# Installation

 - clone this repository
 - `cd html-printer`
 - `npm install`

# Usage

 - `pm2 start` - begin process manager.
 - `pm2 monit` (**optional**) will show process manager output.
 - GET `localhost:2000` and the print will be triggered.

 # Process Manager (pm2)

The set-up for the process manager is in `ecoststem.config.js`. The defines the entry point for this process ac `app.js`.  `app.js` implements a [pm2 Entrypoint](https://pm2.io/doc/en/runtime/guide/entrypoint/). This launches an headless browser using [puppeteer](https://github.com/GoogleChrome/puppeteer) and an [express app](https://expressjs.com/) which interacts with puppeteer.

 # Api functional brief

 The process manager will start one browser session and hold reference to it. Each request will follow these steps:
 
  - open a new page
  - navigate to the specified url
  - directly edit some html
  - puppeteer print to pdf
  - close the page

 # Develop Template

 What is printed is `build/index.html`. 

 This project uses webpack to transpile es6 into es5. See `webpack.config.js`.
 
 This defines `react/index.html` and `react/index.js` as inputs and `build/index.html` and `page-builder.bundle.js` as the output. `npm run dev` triggers the transpilation.

  Uncomment this line in `webpack.config.js` to enable hot-rebuild (not hot-reload).
  ````js
  {
    // watch: true,
  }
  ````

  Then you can visit the html file in the browser and design.

