/*= ===================================================================
Description: subrouter---api
FileName:index.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : Jan 30, 2020

===================================================================== */
export {};
const sFs = require('fs');
//const path=require("path");
const Path = require('path');

const Router = require('koa-router');

//const fs = require('await-fs');

//const querystring = require('querystring');

//const mysqldate = require('mysqldate');// for parse mySQL DataTime //https://www.npmjs.com/package/mysqldate

const DAL = require(Path.resolve(__dirname, '../libs/dal'));

//const Common = require(Path.resolve(__dirname, '../libs/common'));

//const Validator = require(Path.resolve(__dirname, '../libs/validator'));

const VoiceToText = require(Path.resolve(__dirname, '../libs/voice_to_text'));

const Spider = require(Path.resolve(__dirname, '../libs/spider'));

const router = new Router();

/*===========================
* Root of `host/api`
 ===========================*/

// host/api/
router.all('/', async (ctx) => {
       ctx.body = ' <p>API  ROOT</p> ';
});
/*===========================
* Root of `host/api`
 ===========================*/

// host/api/
router.get('/findWord', async (ctx) => {
    console.log(ctx.query);
    const mYword = ctx.query.word;
    const result = await DAL.GetWord(mYword);
    ctx.body = result;
});
/*=================================
* response for `host/api/login` GET
* reserve for future
 =================================*/

router.get('/login', async (ctx) => {
    ctx.body = '<p>API/LOGIN RESPONSE</p>';
    ctx.response.status = 460;// response a status code
});

/*==================================
* response for `host/api/login` POST
* reserve for future
* usage:   POST method
* use static/post.html to test this API
* depends on better-body module, check if it is comment
 =================================*/

router.post('/login', async (ctx) => {
    ctx.body = ctx.request.fields;
    console.log('being called');
    console.log(ctx.request.fields);
});

/*=======================================================================================
* Description:

This API will received a mp3/otherFormat voice file(user's voice instruction)from front end and
then call  Google-speech-text to convert it into TEXT

* ISSUE:  the format of voice file

=========================================================================================*/

 router.post('/voiceToText', async (ctx) => {
    // ctx.body=ctx.request.fields;
    console.log(ctx.request.fields);
    console.log(ctx.request.fields.upfile[0].path);
    const filePath = ctx.request.fields.upfile[0].path;
    const returnText = await VoiceToText.voiceToText(filePath);// Google Speech-TO-Text API
    console.log(returnText);
    ctx.body = 'upload successfully!';
});

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

router.post('/textToVoice', async (ctx) => {
    // Parse the request and get the request Word
    const word:string = ctx.request.fields.word;
    console.log(word);
    // Call method to check if this word exist
    const firstLetter = word.charAt(0).toUpperCase();
    const pathToVoice = `../../../static/voiceDB/us/${firstLetter}`; // compose the Path based on first letter of the word
    //let basePath=Path.resolve()
    console.log(pathToVoice);
    //let readDir = sFs.readdirSync(path.resolve(__dirname, '../../../static/voiceDB/us'));
    const readDir = sFs.readdirSync(Path.resolve(__dirname, pathToVoice));
    const nameList = readDir.map((x) => x.substring(0, x.indexOf('.')));
    const result = nameList.includes(word);//  Check if local DB has this word
    console.log(result);
    let respondVoicePath:string = 'undefined';
    if (result) {
        respondVoicePath = `../../voiceDB/us/${firstLetter}/${word}`;
    } else { // have this word, response file path
         // Call spider to stole the MP3 file of this word
        const thisResult:number = await Spider.RequestYoudao(0, word);
        // Spider fetched the mp3 file successfully
        if (thisResult === 1) {
            respondVoicePath = `../../voiceDB/us/${firstLetter}/${word}`;
        } else {
            respondVoicePath = ' ';// no corresponding MP3 file found
        }
}
    // Respond front end

    //console.log(respondVoicePath);

    ctx.body = respondVoicePath;
});

module.exports = router.routes();
