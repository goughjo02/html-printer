const expect = require('chai').expect;

const { app } = require('../app');

describe('Process Entry Class', function () {

    after(function () {
        // runs after all tests in this block
        // app.onStop()
        // console.log(app.Entrypoint)
    });

    it('Should have title "My Printer App" ', function () {
        expect(app.title).to.equal('My Printer App');
    });
});