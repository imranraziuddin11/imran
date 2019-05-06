// JavaScript source code

var expect = require('chai').expect;
var data_handler = require("../data_handler.js");

describe('Check create command', function () {
    it('Check create command with width and height above the limit(75)', function () {
        var command = "C 500 480";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
    it('Check create command with more number of arguments', function () {
        var command = "C 20 4 a";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
    it('Check create command with less number of arguments', function () {
        var command = "C 20 ";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
    it('Check create command with characters instead of numbers for W or H', function () {
        var command = "C 20 a";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
    it('Check create command with width < 1 or height < 1', function () {
        var command = "C -1 4";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
});