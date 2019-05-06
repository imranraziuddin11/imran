// JavaScript source code

var expect = require('chai').expect;
var data_handler = require("../data_handler.js");

describe('Check line command', function () {
    it('Check line command with more number of arguments', function () {
        var command1 = "C 20 4"
        var command2 = "L 1 2 6 2 5";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check line command with less number of arguments', function () {
        var command1 = "C 20 4"
        var command2 = "L 1 2 6 ";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check line command with characters instead of numbers', function () {
        var command1 = "C 20 4"
        var command2 = "L 1 2 6 a";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check line command with x1 < 1 or y1 < 1 or x2 < 1 or y2 < 1', function () {
        var command1 = "C 20 4"
        var command2 = "L -1 5 -1 2";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
});