// JavaScript source code
'use strict';
var canvas_obj = function () {
    var mCanvas = [];
    var mWidth = 0;
    var mHeight = 0;
    var mHorizontalBorderChar = "-";
    var mVerticalBorderChar = "|";
    var mEmptyChar = " ";
    var mPointChar = "x";
    var mErrorMessages = {
        "horizontal_vertical": "Currently only horizontal or vertical lines are supported",
        "out_of_bound": "Coordinates are out of drawing area, Please try again"
    };

    var create = function (width, height) {
        mCanvas = [];
        mWidth = width;
        mHeight = height;
        for (var i = 0 ; i < (mHeight + 2) ; i++) {
            var row = [];
            for (var j = 0; j < (mWidth + 2) ; j++) {
                if (i == 0 || i == (mHeight + 1)) {
                    row.push(mHorizontalBorderChar);
                } else if (j == 0 || j == (mWidth + 1)) {
                    row.push(mVerticalBorderChar);
                } else {
                    row.push(mEmptyChar);
                };
            }
            mCanvas.push(row);
        }
    };

    var draw_line = function (x1, y1, x2, y2) {
        return add_line_points(x1, y1, x2, y2);
    };


    var add_line_points = function (x1, y1, x2, y2) {
        var error = "";
        if (isInsideCanvas(x1, y1)) {
            if (x2 > mWidth) { //if x2 is out of canvas width trim it.
                x2 = mWidth;
            }
            if (y2 > mHeight) { //if y2 is out of canvas height trim it.
                y2 = mHeight;
            }
            if (x1 == x2) { //horizontal line
                if (y1 > y2) { // if y1 is greater than y2 swap it to make it increment in steps inside for loop. 
                    var temp = y2;
                    y2 = y1;
                    y1 = temp;
                }
                for (y1; y1 <= y2; y1++) { //iterate and add points
                    mCanvas[y1][x1] = mPointChar;
                }
            } else if (y1 == y2) { // vertical line
                if (x1 > x2) { // if x1 is greater than x2 swap it to make it increment in steps inside for loop.
                    var temp = x2;
                    x2 = x1;
                    x1 = temp;
                }
                for (x1; x1 <= x2; x1++) { //iterate and add points
                    mCanvas[y1][x1] = mPointChar;
                }
            } else {
                error = mErrorMessages['horizontal_vertical'];
            }
        } else {
            error = mErrorMessages['out_of_bound'];
        }
        if (error != "") {
            return new Error(error);
        } else {
            return true;
        }
    };

    var draw_rectangle = function (x1, y1, x2, y2) {
        if (x2 > mWidth) { //if x2 is out of canvas width trim it.
            x2 = mWidth;
        }
        if (y2 > mHeight) { //if y2 is out of canvas height trim it.
            y2 = mHeight;
        }
        var top_line = add_line_points(x1, y1, x2, y1); //top line
        if (top_line != true) {
            return top_line;
        }
        var right_line = add_line_points(x2, y1, x2, y2); //right line
        if (right_line != true) {
            return right_line;
        }
        var bottom_line = add_line_points(x1, y2, x2, y2); //bottom line
        if (bottom_line != true) {
            return bottom_line;
        }
        var left_line = add_line_points(x1, y2, x1, y1); //left line
        if (left_line != true) {
            return left_line;
        }
        return true;
    };

    var execute_bucket_fil = function (x, y, bucket_fill_char) {
        var error = "";
        if (isInsideCanvas(x, y)) {
            var current_char = mCanvas[y][x];
            var points_to_fill_array = [];
            points_to_fill_array.push(get_inner_point_array(x, y));
            //Paint the current point and recursively check if right, left, bottom and top points are of same chacracter as the starting point.
            while (points_to_fill_array.length != 0) {
                var current_point = points_to_fill_array.pop();
                if (mCanvas[current_point[1]][current_point[0]] == current_char) {
                    mCanvas[current_point[1]][current_point[0]] = bucket_fill_char;
                }
                //right
                if (current_point[0] + 1 <= mWidth && mCanvas[current_point[1]][current_point[0] + 1] == current_char) {
                    points_to_fill_array.push(get_inner_point_array(current_point[0] + 1, current_point[1]));
                }
                //left
                if (current_point[0] - 1 > 0 && mCanvas[current_point[1]][current_point[0] - 1] == current_char) {
                    points_to_fill_array.push(get_inner_point_array(current_point[0] - 1, current_point[1]));
                }
                //bottom
                if (current_point[1] + 1 <= mHeight && mCanvas[current_point[1] + 1][current_point[0]] == current_char) {
                    points_to_fill_array.push(get_inner_point_array(current_point[0], current_point[1] + 1));
                }
                //top
                if (current_point[1] - 1 > 0 && mCanvas[current_point[1] - 1][current_point[0]] == current_char) {
                    points_to_fill_array.push(get_inner_point_array(current_point[0], current_point[1] - 1));
                }
            }
        } else {
            error = mErrorMessages['out_of_bound'];
        }
        if (error != "") {
            return new Error(error);
        } else {
            return true;
        }
    };

    //create an inner point array to check for bucket-fill point
    var get_inner_point_array = function (x, y) {
        var inner_point = [];
        inner_point.push(x);
        inner_point.push(y);
        return inner_point;
    };

    //iterate through the canvas and create a printable string
    var get_printable_canvas = function () {
        var str = "";
        for (var i = 0 ; i < mCanvas.length; i++) {
            for (var j = 0; j < mCanvas[i].length; j++) {
                str += mCanvas[i][j];
            }
            str += "\n";
        }
        return str;
    };

    //check if starting point is inside the canvas
    var isInsideCanvas = function (x1, y1) {
        return x1 > 0 && x1 <= mWidth && y1 > 0 && y1 <= mHeight;
    };

    return {
        create: create,
        draw_line: draw_line,
        draw_rectangle: draw_rectangle,
        execute_bucket_fil: execute_bucket_fil,
        get_printable_canvas: get_printable_canvas
    };
}();

module.exports = canvas_obj;