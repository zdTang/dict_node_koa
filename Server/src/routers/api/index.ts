/*====================================================================
Discription: subrouter---api
FileName:index.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : Jan 30, 2020
=====================================================================*/
export {};
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
const VoiceToText=require("../../libs/voice_to_text")


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
/*===========================
* Root of `host/api` 
 ===========================*/

// host/api/
router.get("/findWord",async ctx=>{
    console.log(ctx.query);
    let word=ctx.query.word;
    let result = await DAL.GetWord(word);
    ctx.body=result;
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


/*=======================================================================================
* Description: 

This API will received a mp3/otherFormat voice file(user's voice instruction)from front end and
then call  Google-speech-text to convert it into TEXT

* ISSUE:  the format of voice file

=========================================================================================*/

 router.post('/voiceToText',async ctx=>{
    // ctx.body=ctx.request.fields;
    console.log(ctx.request.fields);
    console.log(ctx.request.fields.upfile[0].path);
    let filePath=ctx.request.fields.upfile[0].path;
    let returnText= await VoiceToText.voiceToText(filePath);  // Google Speech-TO-Text API 
    console.log(returnText);
    ctx.body='upload successfully!';
})



/*=======================================================================================
* Description: 

This API will received a name of request MP3 file and response the correspond MP3 file

* STEP 1: Check local voiceDB
  STEP 2: CALL Spider to fetch a MP3 file 
  STEP 3: if 2, then save to voiceDB
  STEP 4: Response with MP3 file path

=========================================================================================*/

router.post('/textToVoice',async ctx=>{
    // Parse the request and get the request Word
    let wordName=ctx.request.fields.firstName;
    console.log(wordName);
    // Call method to check if this word exist

    // Call spider to stole the MP3 file of this word

    // Respond front end

    
    // console.log(ctx.request.fields.upfile[0].path);
    // let filePath=ctx.request.fields.upfile[0].path;
    // let returnText= await VoiceToText.voiceToText(filePath);  // Google Speech-TO-Text API 
  //console.log(returnText);
    ctx.body='done!';
})
   
   




module.exports=router.routes();



