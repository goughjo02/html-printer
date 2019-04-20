# html-printer

# First Time Install

 - `git clone https://github.com/goughjo02/html-printer.git`
 - `cd html-printer`
 - `npm install`
 - `npm run build`

# Usage

 - `pm2 start` begins process manager
 - (**optional**) `pm2 monit` will show process manager output
 - GET `localhost:2000` and the print will be triggered

 # Process Manager (pm2)

The set-up for the process manager is in `ecoststem.config.js`. This defines the entry point for this process as `app.js`.  `app.js` does the following:

 - Implements a [pm2 Entrypoint](https://pm2.io/doc/en/runtime/guide/entrypoint/)
 - Launches an headless browser using [puppeteer](https://github.com/GoogleChrome/puppeteer)
 - Launches an [express app](https://expressjs.com/) to interact with puppeteer

 To Develop `pm2 start --watch` enables hot reload.

 ![pm2-example](./examples-images/pm2-example.png)

 # API

 The process manager will start one browser session and hold reference to it. Each request will follow these steps:
 
  - open a new page
  - navigate to the specified url
  - directly edit some html
  - puppeteer print to pdf
  - close the page

  `localhost:2000?size=card&pageSize=a4`

**Quary Parameters** are intended for content size and print page size

 - page size options: 'A4', 'Card', 'Letter'
 - size options: 'A4', 'Card', 'Letter'

 ![pm2-example](./examples-images/query-example.png)

**urlencoded** body is for page details

`{ [key: string] : string }`

 ![pm2-example](./examples-images/body-example.png)

 # Develop Template

 What is printed is `build/index.html`. 

 For dynamically inserted data - the id of the target div must match the key in the body.

 for example this data: 

 ````js
 {
   name: "Donald"
 }
 ````

 would target div

 ````html
 <div id="name"></div>
 ````

 and convert it to 

 ````html
 <div id="name">Donald</div>
 ````

 ![result-example](./examples-images/example-result.png)

 This project uses webpack to transpile es6 into es5. See `webpack.config.js`.
 
 This defines `react/index.html` and `react/index.js` as inputs and `build/index.html` and `page-builder.bundle.js` as the output. `npm run dev` triggers the transpilation.

  Uncomment this line in `webpack.config.js` to enable hot-rebuild (not hot-reload).
  ````js
  {
    // watch: true,
  }
  ````

  Then you can visit the html file in the browser and design.


