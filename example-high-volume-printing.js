const { printBasic } = require('./print-basic');

let count = 0;
const max = 50;

const loop = setInterval(function () {
    const start = Date.now();
    printBasic('Donald', 'Duck', 'donnyd@feathermail.com', 'card', 'a4', count.toString()).then(e => {
        const end = Date.now();
        const elapsed = end-start;
        console.log(`${count}: ${elapsed}ms`)
    }).catch(err => {
        console.log(err)
    });
    if (count >= max) {
        clearInterval(loop);
    }
    count++
}, 750);

