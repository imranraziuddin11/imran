// JavaScript source code

var expect = require('chai').expect;
var data_handler = require("../data_handler.js");

describe('Check bucket-fill command', function () {
    it('Check bucket-fill command with more number of arguments', function () {
        var command1 = "C 20 4"
        var command2 = "B 14 1 c c";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check bucket-fill command with less number of arguments', function () {
        var command1 = "C 20 4"
        var command2 = "B 14 o";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check bucket-fill command with characters instead of numbers', function () {
        var command1 = "C 20 4"
        var command2 = "B 14 x o";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check bucket-fill command with x < 1 or y < 1', function () {
        var command1 = "C 20 4"
        var command2 = "B -1 0 o";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check bucket-fill command with double character color', function () {
        var command1 = "C 20 4"
        var command2 = "B 10 3 oo";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
});