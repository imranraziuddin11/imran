// JavaScript source code

var expect = require('chai').expect;
var data_handler = require("../data_handler.js");

describe('Check edge cases', function () {
    it('Check if the starting line point is out of the canvas', function () {
        var command1 = "C 20 4";
        var command2 = "L 21 1 21 50";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check line points overflow', function () {
        var command1 = "C 20 4";
        var command2 = "L 5 1 5 50";
        var result = "----------------------\n"
                   + "|    x               |\n"
                   + "|    x               |\n"
                   + "|    x               |\n"
                   + "|    x               |\n"
                   + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.eql(result);
    });
    it('Check if the starting rectangle point is out of the canvas', function () {
        var command1 = "C 20 4";
        var command2 = "R 21 1 21 50";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check rectangle points overflow', function () {
        var command1 = "C 20 4";
        var command2 = "R 5 1 50 50";
        var result = "----------------------\n"
                   + "|    xxxxxxxxxxxxxxxx|\n"
                   + "|    x              x|\n"
                   + "|    x              x|\n"
                   + "|    xxxxxxxxxxxxxxxx|\n"
                   + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.eql(result);
    });
    it('Check if the starting bucket-fill point is out of the canvas', function () {
        var command1 = "C 20 4";
        var command2 = "B 50 1 o";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.an('error');
    });
    it('Check bucket-fill on plain canvas', function () {
        var command1 = "C 20 4";
        var command2 = "B 6 2 u";
        var result = "----------------------\n"
                   + "|uuuuuuuuuuuuuuuuuuuu|\n"
                   + "|uuuuuuuuuuuuuuuuuuuu|\n"
                   + "|uuuuuuuuuuuuuuuuuuuu|\n"
                   + "|uuuuuuuuuuuuuuuuuuuu|\n"
                   + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.be.eql(result);
    });
    it('Check bucket-fill on left half of the canvas', function () {
        var command1 = "C 20 4";
        var command2 = "L 10 1 10 50";
        var command3 = "B 6 2 u";
        var result = "----------------------\n"
                   + "|uuuuuuuuux          |\n"
                   + "|uuuuuuuuux          |\n"
                   + "|uuuuuuuuux          |\n"
                   + "|uuuuuuuuux          |\n"
                   + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.not.be.an('error');
        expect(data_handler.process_data(command3)).to.be.eql(result);
    });
    it('Check bucket-fill on existing point/edge(s)', function () {
        var command1 = "C 20 4";
        var command2 = "L 10 1 10 50";
        var command3 = "B 10 1 u";
        var result = "----------------------\n"
                   + "|         u          |\n"
                   + "|         u          |\n"
                   + "|         u          |\n"
                   + "|         u          |\n"
                   + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.not.be.an('error');
        expect(data_handler.process_data(command3)).to.be.eql(result);
    });
    it('Check points overlap', function () {
        var command1 = "C 20 4";
        var command2 = "L 1 2 50 2";
        var command3 = "R 5 1 10 4";
        var result = "----------------------\n"
                   + "|    xxxxxx          |\n"
                   + "|xxxxxxxxxxxxxxxxxxxx|\n"
                   + "|    x    x          |\n"
                   + "|    xxxxxx          |\n"
                   + "----------------------\n";
        expect(data_handler.process_data(command1)).to.not.be.an('error');
        expect(data_handler.process_data(command2)).to.not.be.an('error');
        expect(data_handler.process_data(command3)).to.be.eql(result);
    });
});