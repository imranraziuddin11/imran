// JavaScript source code
'use strict';
var data_handler = require("./data_handler.js");

var stdin = process.openStdin();

console.log("enter command: ");
stdin.addListener("data", function (input_value) {
    //trim the extra spaces from input string
    var user_command = input_value.toString().trim();
    //throws either error (or) returns printable canvas 
    //in case of quit('Q') the process terminates and returns nothing
    var executed_result = data_handler.process_data(user_command);
    if (typeof (executed_result) == "string") {
        console.log(executed_result); //print canvas
    } else {
        console.log(executed_result.message); //print error message
    }
    console.log("enter command: ");
});

