"use strict";
exports.__esModule = true;
var express_1 = require("express");
var main_1 = require("./router/main");
var path_1 = require("path");
if (!module.parent) {
    new main_1.router((0, express_1["default"])(), path_1["default"].join(__dirname, 'components')).start_lab(3000);
    console.log("LAB IS REDY");
}
