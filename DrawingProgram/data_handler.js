// JavaScript source code
'use strict';
var canvas_obj = require("./canvas.js");

var data_handler = function () {
    var mIsCanvasCreated = false;
    var mErrorMessages = {
        "syntax_canvas": "Syntax of the command is not valid, to create canvas use: 'C w h'",
        "syntax_line": "Syntax of the command is not valid, to draw line use: 'L x1 y1 x2 y2'",
        "syntax_rectangle": "Syntax of the command is not valid, to draw rectangle use: 'R x1 y1 x2 y2'",
        "syntax_bucket_fill": "Syntax of the command is not valid, for bucket-fill tool use: 'B x y c'",
        "bucket_fill_character": "Bucket Fill color can only be a single character",
        "create_canvas": "Please create the canvas before executing this command",
        "single_character_command": "Only single character commands are supported",
        "unhandled": "Unhandled command",
        "empty_command": "Please provide a command to execute",
        "distorted_canvas": "Width and height should be <=75 as the canvas usually gets distorted otherwise"
    };

    var process_data = function (user_command) {
        if (user_command == "") { return new Error(mErrorMessages['empty_command']) } //return if command is empty
        var error = "";
        var split_command = user_command.split(" "); //split command with space character
        if (split_command[0].trim().length == 1) {
            switch (user_command.substr(0, 2).trim()) {
                case "C":
                    if (split_command.length == 3 && check_arguments(split_command, 2)) {
                        var width = parseInt(split_command[1]);
                        var height = parseInt(split_command[2]);
                        //[assumption] canvas of width or height above 75 usually gets distorted on console view
                        if (width <= 75 && height <= 75) {
                            mIsCanvasCreated = true;
                            canvas_obj.create(width, height);
                        } else {
                            error = mErrorMessages['distorted_canvas'];
                        }
                    } else {
                        error = mErrorMessages['syntax_canvas'];
                    }
                    break;
                case "L":
                    if (mIsCanvasCreated) {
                        if (split_command.length == 5 && check_arguments(split_command, 4)) {
                            var draw_line_result = canvas_obj.draw_line(parseInt(split_command[1]), parseInt(split_command[2]), parseInt(split_command[3]), parseInt(split_command[4]));
                            //if this is not true then there was an error
                            if (draw_line_result != true) {
                                error = draw_line_result.message; // get error message
                            }
                        } else {
                            error = mErrorMessages['syntax_line'];
                        }
                    } else {
                        error = mErrorMessages['create_canvas'];
                    }
                    break;
                case "R":
                    if (mIsCanvasCreated) {
                        if (split_command.length == 5 && check_arguments(split_command, 4)) {
                            var draw_rectangle_result = canvas_obj.draw_rectangle(parseInt(split_command[1]), parseInt(split_command[2]), parseInt(split_command[3]), parseInt(split_command[4]));
                            //if this is not true then there was an error
                            if (draw_rectangle_result != true) {
                                error = draw_rectangle_result.message; // get error message
                            }
                        } else {
                            error = mErrorMessages['syntax_rectangle'];
                        }
                    } else {
                        error = mErrorMessages['create_canvas'];
                    }
                    break;
                case "B":
                    if (mIsCanvasCreated) {
                        if (split_command.length == 4 && check_arguments(split_command, 2)) {
                            if (split_command[3].length == 1) {
                                var execute_bucket_fil_result = canvas_obj.execute_bucket_fil(parseInt(split_command[1]), parseInt(split_command[2]), split_command[3]);
                                //if this is not true then there was an error
                                if (execute_bucket_fil_result != true) {
                                    error = execute_bucket_fil_result.message; // get error message
                                }
                            } else {
                                error = mErrorMessages['bucket_fill_character'];
                            }
                        } else {
                            error = mErrorMessages['syntax_bucket_fill'];
                        }
                    } else {
                        error = mErrorMessages['create_canvas'];
                    }
                    break;
                case "Q":
                    process.exit([0]);
                    break;
                default:
                    error = mErrorMessages['unhandled'];
                    break;
            }
        } else {
            error = mErrorMessages['single_character_command'];
        }

        //check if error occurred 
        if (error != "") {
            return new Error(error);
        } else { //else return printable canvas
            return canvas_obj.get_printable_canvas();
        }
    };

    //checks if the provided input matches the required number of intergers 
    var check_arguments = function (split_command_array, num_of_int_args) {
        for (var i = 1; i <= num_of_int_args; i++) {
            var current_arg = parseInt(split_command_array[i]);
            if (isNaN(current_arg)) { //parseInt returns NaN for characters
                return false;
                break;
            }  else if (current_arg < 1) { //to avoid negative inputs
                return false;
                break;
            }
        }
        return true;
    };

    return {
        process_data: process_data
    }
}();

module.exports = data_handler;