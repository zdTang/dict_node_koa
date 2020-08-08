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
var Router = require('koa-router');
var fs = require('await-fs');
var path = require('path');
//const config=require('../../config');
var common = require('../libs/common');
//const {HTTP_ROOT}=ctx.config;
var router = new Router();
// return a login page
router.get('/login', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //ctx.body='aaa';  //used for testing
            return [4 /*yield*/, ctx.render('./admin/login', {
                    HTTP_ROOT: ctx.config.HTTP_ROOT,
                    errmsg: ctx.query.errmsg
                })];
            case 1:
                //ctx.body='aaa';  //used for testing
                _a.sent(); //
                return [2 /*return*/];
        }
    });
}); });
// return a form
router.post('/login', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    //ctx.body=admins;     // used for testing
    function findAdmin(userName) {
        var a = null;
        admins.forEach(function (admin) {
            if (admin.username === userName) {
                a = admin;
            }
        });
        return a;
    }
    var HTTP_ROOT, _a, username, password, json, admins, admin;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                HTTP_ROOT = ctx.config.HTTP_ROOT;
                _a = ctx.request.fields, username = _a.username, password = _a.password;
                console.log(username + "--" + password);
                return [4 /*yield*/, fs.readFile(path.resolve(__dirname, '../../server/admins.json'))];
            case 1:
                json = (_b.sent()).toString();
                admins = JSON.parse(json);
                console.log(admins); // used for testing
                admin = findAdmin(username);
                // The default Admin account is :   root,   password: 123456
                if (!admin) {
                    // ctx.body='no this user';
                    ctx.redirect(HTTP_ROOT + "/admin/login?errmsg=" + encodeURIComponent('User not exist!')); // TO HIDE THE MESSAGE
                    // TO HIDE THE MESSAGE
                }
                else if (admin.password !== common.md5(password + ctx.config.ADMIN_SUFFIX)) {
                    console.log(admin.password);
                    console.log(common.md5(password + ctx.config.ADMIN_SUFFIX));
                    ctx.redirect(HTTP_ROOT + "/admin/login?errmsg=" + encodeURIComponent('Wrong Password!!')); //
                }
                else {
                    ctx.body = 'you are in...';
                    //success
                    //ctx.session['admin'] = username;//  or set session['admin']=ture
                    ctx.session.admin = username;
                    ctx.redirect(HTTP_ROOT + "/admin/"); // go to admin's root directory
                }
                return [2 /*return*/];
        }
    });
}); });
// This router must be put after the Login module
router.all('*', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.session.admin) return [3 /*break*/, 2];
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                //ctx.body='You are not administrator!!!!';
                //let
                ctx.redirect(ctx.config.HTTP_ROOT + "/admin/login");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// return a login page
router.get('/', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = 'admin root'; //used for testing
        return [2 /*return*/];
    });
}); });
module.exports = router.routes();
