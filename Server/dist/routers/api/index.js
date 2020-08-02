"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sFs = require("fs");
//const path=require("path");
var Path = require('path');
var Router = require('koa-router');
var fs = require('await-fs');
var querystring = require("querystring");
var mysqldate = require("mysqldate"); // for parse mySQL DataTime //https://www.npmjs.com/package/mysqldate
var DAL = require(Path.resolve(__dirname, '../../libs/dal'));
//const Math=require(Path.resolve(__dirname,'../../libs/Math')); 
////const Business = require(Path.resolve(__dirname,'../../libs/Business')); 
var Common = require(Path.resolve(__dirname, '../../libs/common'));
var Validator = require(Path.resolve(__dirname, '../../libs/validator'));
//const PositionProcessor = require(Path.resolve(__dirname,'../../libs/position'));
//const PiaProcessor = require(Path.resolve(__dirname,'../../libs/pia'));
//const Status = require(Path.resolve(__dirname,'../../libs/status'));
var VoiceToText = require("../../libs/voice_to_text");
var Spider = require(Path.resolve(__dirname, "../../libs/spider"));
/*=======================================================
 * this is used as enum, will wait for the final decision
 =======================================================*/
// const legStatusType = {
//     Arrival: 5,
//     Load: 1,
//     Departure: 2,
//     InTransit: 3,
// };
var router = new Router();
/*===========================
* Root of `host/api`
 ===========================*/
// host/api/
router.all("/", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = " <p>API  ROOT</p> ";
        return [2 /*return*/];
    });
}); });
/*===========================
* Root of `host/api`
 ===========================*/
// host/api/
router.get("/findWord", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var word, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(ctx.query);
                word = ctx.query.word;
                return [4 /*yield*/, DAL.GetWord(word)];
            case 1:
                result = _a.sent();
                ctx.body = result;
                return [2 /*return*/];
        }
    });
}); });
/*=================================
* response for `host/api/login` GET
* reserve for future
 =================================*/
router.get('/login', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = '<p>API/LOGIN RESPONSE</p>';
        ctx.response.status = 460; // response a status code
        return [2 /*return*/];
    });
}); });
/*==================================
* response for `host/api/login` POST
* reserve for future
* usage:   POST method
* use static/post.html to test this API
* depends on better-body module, check if it is comment
 =================================*/
router.post('/login', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = ctx.request.fields;
        console.log('being called');
        console.log(ctx.request.fields);
        return [2 /*return*/];
    });
}); });
/*=======================================================================================
* Description:

This API will received a mp3/otherFormat voice file(user's voice instruction)from front end and
then call  Google-speech-text to convert it into TEXT

* ISSUE:  the format of voice file

=========================================================================================*/
router.post('/voiceToText', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, returnText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // ctx.body=ctx.request.fields;
                console.log(ctx.request.fields);
                console.log(ctx.request.fields.upfile[0].path);
                filePath = ctx.request.fields.upfile[0].path;
                return [4 /*yield*/, VoiceToText.voiceToText(filePath)];
            case 1:
                returnText = _a.sent();
                console.log(returnText);
                ctx.body = 'upload successfully!';
                return [2 /*return*/];
        }
    });
}); });
/*=======================================================================================
* Description:

This API will received a name of request MP3 file and response the correspond MP3 file

* STEP 1: Check local voiceDB
  STEP 2: CALL Spider to fetch a MP3 file
  STEP 3: if 2, then save to voiceDB
  STEP 4: Response with MP3 file path

  Dependencies:
   libs/Spider    ==== To fetch mp3 file from other website
   static/voiceDB ==== Local voice DB

=========================================================================================*/
router.post('/textToVoice', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var word, firstLetter, pathToVoice, readDir, nameList, result, respondVoicePath, result_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                word = ctx.request.fields.word;
                console.log(word);
                firstLetter = word.charAt(0).toUpperCase();
                pathToVoice = "../../../static/voiceDB/us/" + firstLetter;
                console.log(pathToVoice);
                readDir = sFs.readdirSync(Path.resolve(__dirname, pathToVoice));
                nameList = readDir.map(function (x) { return x.substring(0, x.indexOf(".")); });
                result = nameList.includes(word);
                console.log(result);
                respondVoicePath = "undefined";
                if (!result) return [3 /*break*/, 1];
                respondVoicePath = "../../voiceDB/us/" + firstLetter + "/" + word; // have this word, response file path
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Spider.RequestYoudao(0, word)];
            case 2:
                result_1 = _a.sent();
                if (result_1 == 1) // Spider fetched the mp3 file successfully
                    respondVoicePath = "../../voiceDB/us/" + firstLetter + "/" + word;
                else
                    respondVoicePath = " "; // no corresponding MP3 file found
                _a.label = 3;
            case 3:
                // Respond front end
                //console.log(respondVoicePath);
                ctx.body = respondVoicePath;
                return [2 /*return*/];
        }
    });
}); });
module.exports = router.routes();
