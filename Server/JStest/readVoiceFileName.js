const sFs=require("fs");
const path=require("path");



let readDir = sFs.readdirSync(path.resolve(__dirname, '../voiceDB/en/British/A'));
let nameList=readDir.map(x=>{return x.substring(0,x.indexOf("."))});
let result= nameList.includes("akkkkk");
//ctx.body=result;
console.log(result);