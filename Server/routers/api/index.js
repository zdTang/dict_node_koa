/*====================================================================
Discription: subrouter---api
FileName:index.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : Jan 30, 2020
=====================================================================*/
const Path=require('path');
const Router=require('koa-router');
const fs=require('await-fs');  
const querystring=require(`querystring`);
const mysqldate=require(`mysqldate`);// for parse mySQL DataTime //https://www.npmjs.com/package/mysqldate
const DAL=require(Path.resolve(__dirname,'../../libs/dal'));
//const Math=require(Path.resolve(__dirname,'../../libs/Math')); 
////const Business = require(Path.resolve(__dirname,'../../libs/Business')); 
const Common = require(Path.resolve(__dirname,'../../libs/common')); 
const Validator = require(Path.resolve(__dirname,'../../libs/validator')); 
//const PositionProcessor = require(Path.resolve(__dirname,'../../libs/position'));
//const PiaProcessor = require(Path.resolve(__dirname,'../../libs/pia'));
//const Status = require(Path.resolve(__dirname,'../../libs/status'));


/*=======================================================
 * this is used as enum, will wait for the final decision
 =======================================================*/

// const legStatusType = {
//     Arrival: 5,
//     Load: 1,
//     Departure: 2,
//     InTransit: 3,
// };





let router=new Router();

/*===========================
* Root of `host/api` 
 ===========================*/

// host/api/
router.all("/",async ctx=>{
       ctx.body=" <p>API  ROOT</p> ";
})


/*=================================
* response for `host/api/login` GET
* reserve for future
 =================================*/

router.get('/login',async ctx=>{
    ctx.body='<p>API/LOGIN RESPONSE</p>';
    ctx.response.status=460;  // response a status code
})


/*==================================
* response for `host/api/login` POST
* reserve for future
* usage:   POST method
* use static/post.html to test this API
* depends on better-body module, check if it is comment
 =================================*/

router.post('/login',async ctx=>{
    ctx.body=ctx.request.fields;
    console.log('being called');
    console.log(ctx.request.fields)
})


/*========================================================
* Description: Processing received Position information
*              Once receive a Position, will validate first
               and determine which RouteId it belongs, then
               insert relevant data into DB
* use static/position.html to test this API
 ========================================================*/


   




module.exports=router.routes();



