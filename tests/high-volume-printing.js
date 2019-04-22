const { printBasic } = require('../print-basic');
var fs = require("fs");

const oneRun = function (run_number, cb) {
    let result = '';
    const start = Date.now();
    return new Promise((resolve, reject) => {
        printBasic('Donald', 'Duck', 'donnyd@feathermail.com', 'card', 'a4', `./generated-pdfs/${run_number.toString()}`).then(e => {
            const end = Date.now();
            const elapsed = end - start;
            result = result + `${run_number.toString()}, ${elapsed.toString()}\r\n`;
            resolve(result);
            console.log(`${run_number}: ${elapsed}ms`)
        }).catch(err => {
            console.log(err)
        });
    })
}

const multiRuns = function (shot_interval) {
    let count = 0;
    const max = 1000;
    let completed = 0;
    let results = "run_number, time(ms) \r\n";
    return new Promise((resolve, reject) => {
        const loop = setInterval(function () {
            count++
            oneRun(count).then(result => {
                // console.log(result);
                results = results + result;
                if (completed === max) {
                    console.log(completed)
                    resolve(results);
                }
                completed++;
            })
            if (count > max) {
                clearInterval(loop);
            }
        }, shot_interval);
    })
}

multiRuns(350).then(results => {
    // console.log(results)
    fs.writeFile("./results/delay-350ms-1000-prints-results.csv", results, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
})

const test_times = [
    // 1000,
    750,
    500,
    // 400,
    // 300,
    // 250
]

