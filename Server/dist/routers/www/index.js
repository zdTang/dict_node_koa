const Router=require('koa-router');
const DAL = require('../../libs/dal');
//const Business = require('../../libs/Business');

let router=new Router();
router.get('news',async ctx=>{
    ctx.body='bbb';
});



router.get('/',async ctx=>{
    ctx.body='<p>WWW Root Test</p>';
    // let position={GPSid:'1', Latitude:43.888, Longitude:-79.9999, DateTime:"2019-12-11 01:24:00"}; // assume the GPS Like this
    // //let GPSidList=[];
    // if(global.GpsIdList==undefined)
    // {
    //     list =await DAL.GetGpsIdList();
    //     if(list!==0){ // 0 : Error occurs when access database
    //         global.GpsIdList = list;
    //     }  
    //     else{
    //         ctx.body='Error occurs when access database, check Log file';
    //     }    
    // }

    // let gpsIdList=global.GpsIdList;
    // if(!gpsIdList.includes(position.GPSid))
    // {
    //     ctx.body='GPS id is not exist!';
    // }
    // console.log(gpsIdList);

    //==========================

    // let legs= await DAL.GetLegs(30);
    // console.log(legs);
    // let status= Business.GetCurrentLegIndexAndStage(legs);
    // console.log(status);



})

module.exports=router.routes();