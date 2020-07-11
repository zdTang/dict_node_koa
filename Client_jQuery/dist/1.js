"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __importDefault(require("./libs/parse"));
var a = "i am a boy";
console.log(parse_1.default.ParseSentence(a));
console.log(parse_1.default.ParseWord("WORD"));
