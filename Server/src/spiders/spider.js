const request=require('../libs/request');
const fs=require('fs');

(async()=>{
  try{
    //http://dict.youdao.com/dictvoice?type=0&audio=king
   // let {body, headers}=await request('https://shouji.tmall.com/');
   let {body, headers}=await request('http://dict.youdao.com/dictvoice?type=0&audio=king');

    fs.writeFile(`tmp/youdao.mp3`, body, err=>{
      console.log(err);
    });
  }catch(e){
    console.log('请求失败');
  }
})();
