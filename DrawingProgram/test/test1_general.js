// JavaScript source code

var expect = require('chai').expect;
var data_handler = require("../data_handler.js");

describe('Check general cases', function () {
    it('Check empty command', function () {
        var command = "";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
    it('Check unhandled command', function () {
        var command = "T 18 2 3 4";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
    it('Check double character commands', function () {
        var command1 = "CC 20 4";
        var command2 = "LL 20 4";
        var command3 = "RR 20 4";
        var command4 = "BB 20 4";
        var command5 = "C2 40";
        expect(data_handler.process_data(command1)).to.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
        expect(data_handler.process_data(command3)).to.be.an('error');
        expect(data_handler.process_data(command4)).to.be.an('error');
        expect(data_handler.process_data(command5)).to.be.an('error');
    });
    it('Check example command set: create command', function () {
        var command1 = "C 20 4";
        var result = "----------------------\n"
                    + "|                    |\n"
                    + "|                    |\n"
                    + "|                    |\n"
                    + "|                    |\n"
                    + "----------------------\n";
        expect(data_handler.process_data(command1)).to.be.eql(result);
    });
    it('Check example command set: first line command', function () {
        var command1 = "C 20 4";
        var command2 = "L 1 2 6 2";
        var result = "----------------------\n"
                    + "|                    |\n"
                    + "|xxxxxx              |\n"
                    + "|                    |\n"
                    + "|                    |\n"
                    + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.eql(result);
    });
    it('Check example command set: second line command', function () {
        var command1 = "C 20 4";
        var command2 = "L 1 2 6 2";
        var command3 = "L 6 3 6 4";
        var result = "----------------------\n"
                    + "|                    |\n"
                    + "|xxxxxx              |\n"
                    + "|     x              |\n"
                    + "|     x              |\n"
                    + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.not.be.an('error');
        expect(data_handler.process_data(command3)).to.be.eql(result);
    });

    it('Check example command set: rectangle command', function () {
        var command1 = "C 20 4";
        var command2 = "L 1 2 6 2";
        var command3 = "L 6 3 6 4";
        var command4 = "R 14 1 18 3";
        var result = "----------------------\n"
                    + "|             xxxxx  |\n"
                    + "|xxxxxx       x   x  |\n"
                    + "|     x       xxxxx  |\n"
                    + "|     x              |\n"
                    + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.not.be.an('error');
        expect(data_handler.process_data(command3)).to.not.be.an('error');
        expect(data_handler.process_data(command4)).to.be.eql(result);
    });

    it('Check example command set: bucket-fill command', function () {
        var command1 = "C 20 4";
        var command2 = "L 1 2 6 2";
        var command3 = "L 6 3 6 4";
        var command4 = "R 14 1 18 3";
        var command5 = "B 10 3 o";
        var result = "----------------------\n"
                    + "|oooooooooooooxxxxxoo|\n"
                    + "|xxxxxxooooooox   xoo|\n"
                    + "|     xoooooooxxxxxoo|\n"
                    + "|     xoooooooooooooo|\n"
                    + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.not.be.an('error');
        expect(data_handler.process_data(command3)).to.not.be.an('error');
        expect(data_handler.process_data(command4)).to.not.be.an('error');
        expect(data_handler.process_data(command5)).to.be.eql(result);
    });
    it('Check command with extra spaces', function () {
        var command = "C  20  4";
        expect(data_handler.process_data(command)).to.be.an('error');
    });
});