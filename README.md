# html-printer

This project uses a nodejs process manager, [pm2](https://pm2.io/doc/en/runtime/overview/).

The api is using [express](https://expressjs.com/).

# Usage

`pm2 start` will begin the process manager:
 - launches a headless browser using [puppeteer](https://github.com/GoogleChrome/puppeteer)
 - opens a new page and navigates to the html file
 - defines an express app endpoint for printing a pdf
 - begins the express app listening

 `pm2 monit` (**optional**) will show process manager output including console logs.

 in a webbrowser, navigate to `localhost:2000` and the print will be triggered.

 # Api functional brief

 The process will start one browser session. Each request will navigate to a page, directly edit some html, and print to pdf.

 # Design

 What is printed is `build/index.html`. 

 This project is set up to use react. The react code is in the `react/` directory. `npm run dev` will bundle the es6 javascript and index.html in the react folder, into es5 javascript code in the `build/` directory.
  