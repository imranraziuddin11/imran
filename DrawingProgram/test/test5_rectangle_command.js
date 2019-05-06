// JavaScript source code

var expect = require('chai').expect;
var data_handler = require("../data_handler.js");

describe('Check rectangle command', function () {
    it('Check rectangle command with more number of arguments', function () {
        var command1 = "C 20 4"
        var command2 = "R 14 1 18 3 1";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check rectangle command with less number of arguments', function () {
        var command1 = "C 20 4"
        var command2 = "R 14 1 18 ";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check rectangle command with characters instead of numbers', function () {
        var command1 = "C 20 4"
        var command2 = "R 14 1 18 a";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check rectangle command with x1 < 1 or y1 < 1 or x2 < 1 or y2 < 1', function () {
        var command1 = "C 20 4"
        var command2 = "R -14 1 18 3";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
});