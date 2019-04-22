const { printBasic } = require('./print-basic');

printBasic('Donald', 'Duck', 'donnyd@feathermail.com', 'card', 'a4').then(e => {
    console.log(e)
});
