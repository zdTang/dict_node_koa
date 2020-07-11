"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
//import Jquery
function target(x) {
    var o = jquery_1.default(x);
    o.click(function () {
        alert(o);
    });
}
target("#name");
