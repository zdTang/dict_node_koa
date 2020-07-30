"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require('koa');
var Router = require('koa-router'); // Middleware as router
var body = require('koa-better-body'); // for POST request parsing
var path = require('path');
var session = require('koa-session');
//const fs=require('await-fs');                          // file IO
var fs = require('fs');
var ejs = require('koa-ejs');
//const config=require('../config');
var config = require(path.resolve(__dirname, '../../config'));
//const static=require('../routers/static');
var staticFile = require(path.resolve(__dirname, '../routers/static'));
var io = require('socket.io');
var http = require('http');
var DAL = require('../libs/DAL');
var app = new Koa();
var server = http.createServer(app.callback());
var ws = io(server);
server.listen(config.PORT);
console.log("Server is running at " + config.PORT + "!");
/*============================================================================*/
// Description:   Error Handler                                                //
// uncomment the following code only in production environment                 //
/*============================================================================ */
// router.use(async (ctx,next)=>{
// try{
// await next();//  will try all of the consequent processing
// }
// catch(err)
// {
//ctx.state=500;// Status Code  //doesn't work
//ctx.body='Interan Server Error';  //  display on Html Page
// ctx.throw(500,'WRONG');
// }
// });
/*================================================= */
// packageName:   'better-body'                      //
// Description:   parse POST formData and body data  //
// used for parseing POST Request                    //
/*================================================== */
app.use(body({
    // this directory is for upload file
    uploadDir: path.resolve(__dirname, '../static/upload')
}));
/*================ Session Module =============== */
// packageName:    'session'                      //
// to set up session parameters                   //
/*=============================================== */
//app.keys=fs.readFileSync('./libs/.keys').toString().split('\n');   // keys for encrypting session
app.keys = fs.readFileSync(path.resolve(__dirname, '../libs/.keys')).toString().split('\n'); // keys for encrypting session
app.use(session({
    maxAge: 60 * 1000,
    renew: true // if renew session
}, app));
/*================================================================== */
// Description: Bind modules to Koa context prototype                //
// List:                                                             //
// 1.   db ===> mysql                                                //
// 2.   config  ==> config.json file                                 //
/*================================================================== */
//app.context.db=require('../libs/database');      //add db as a property
app.context.db = require(path.resolve(__dirname, '../libs/database')); //add db as a property
app.context.config = config; // add config as a property
//app.context.locations = await DAL.GetPlantIDs();
// app.context.location =await ctx.db.query(`select * from location`);
/*================================================================== */
// Description: Server side render                                   //
// Here to customize EJS app side render                          //
// package :  'ejs'                                                  //
//                                                                   //
/*================================================================== */
ejs(app, {
    root: path.resolve(__dirname, '../template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});
/*================================================================== */
// Description: Create Router                                        //
// Package Name:  "koa-router"                                       //
/*================================================================== */
var router = new Router(); // Instantiate an Router
//router.use('/admin',require('../routers/admin'));      //  'host/admin'
router.use('/admin', require(path.resolve(__dirname, '../routers/admin'))); //  'host/admin'
//router.use('/api',require('../routers/api'));          //  'host/api'
router.use('/api', require(path.resolve(__dirname, '../routers/api'))); //  'host/api'
//router.use('/',require('../routers/www'));
router.use('/', require(path.resolve(__dirname, '../routers/www')));
/*================================================================== */
// Description: Static files Router  
//              put this static file router as the last one          //
// Package Name:  "koa-static"                                       //
/*================================================================== */
staticFile(router, {
    html: 30 // give it a duration as one year :365 days
});
/*================================================================== */
// Description: websocket                                            //
// Package Name:  "socket.io"                                        //
/*================================================================== */
//TODO:   
ws.on('connection', function (socket) {
    console.log('a user connected');
    //
    socket.on('chat message', function (msg) {
        console.log('chat message:' + msg);
        // broadcast to everyone
        var oneSecond = 1000 * 1; // one second = 1000 x 1 ms
        setInterval(function () {
            var data = (new Date()).getSeconds();
            ws.emit('chat message', "GPS DATA From Server==" + data);
            console.log("sending message: " + data);
        }, oneSecond);
        //ws.emit('chat message', msg);
        //broadcasting to everyone but not for  the sender
        // socket.broadcast.emit('chat message', msg)
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
app.use(router.routes()); // must have
