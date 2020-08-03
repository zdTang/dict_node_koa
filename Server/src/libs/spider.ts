/*=============================
Description: Pay attention to path 
between Linux and Windows platform
 =============================*/

export {};
const request=require('./request');
const fs=require('fs');
const path=require("path");

module.exports={
/*======================================
Description: Request mp3 file from Youdao
Parameters: 
             type: 0=us, 1=en/british
             word: the word which the mp3 file
========================================*/
    async RequestYoudao(type:number=0,word:string){
        try{
            //http://dict.youdao.com/dictvoice?type=0&audio=king
           // let {body, headers}=await request('https://shouji.tmall.com/');
           let requestString:string=`http://dict.youdao.com/dictvoice?type=${type}&audio=${word}`;
           console.log(requestString);
           let {body, headers}=await request(requestString);
           let writeRootPath:string=path.resolve(__dirname,`../../static/voiceDB`);
           console.log(writeRootPath);
           let countryID=(type==0?"us":"en");
           let firstLetter=word.charAt(0).toUpperCase();;
           /*Window version path */
           //let wordPath=writeRootPath+"\\"+countryID+"\\"+firstLetter+"\\"+word+'.mp3';
           /*Linux version path */
           //pay attention
           let wordPath=writeRootPath+"/"+countryID+"/"+firstLetter+"/"+word+'.mp3';
           console.log(wordPath);
          // fs.writeFile(`tmp/youdao.mp3`, body, err=>{
            fs.writeFile(wordPath, body, err=>{
              console.log(err);
              return 0;  // fail
            });
            return 1;     // success!
          }catch(e){
            console.log("Request fail!");
          }

    }
 

}