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
const DAL=require(Path.resolve(__dirname,'../../libs/DAL'));
const Math=require(Path.resolve(__dirname,'../../libs/Math')); 
const Business = require(Path.resolve(__dirname,'../../libs/Business')); 
const Common = require(Path.resolve(__dirname,'../../libs/common')); 
const Validator = require(Path.resolve(__dirname,'../../libs/validator')); 
const PositionProcessor = require(Path.resolve(__dirname,'../../libs/position'));
const PiaProcessor = require(Path.resolve(__dirname,'../../libs/pia'));
const Status = require(Path.resolve(__dirname,'../../libs/status'));


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

router.post('/position',async ctx=>{
    ctx.body=ctx.request.fields;
    console.log('being called');
    console.log(ctx.request.fields);
    // TODO: will cache GPS coordinate into global
    

    let spot={GPSid:ctx.request.fields.GPSid, Latitude:Number(ctx.request.fields.Latitude), Longitude:Number(ctx.request.fields.Longitude), DateTime:ctx.request.fields.DateTime};
    let position=[]; // assume the GPS Like this,a array contains several Positions
    position.push(spot);
    let getPredefineDataResult = 1;

    /*==========================================
    * use cache to contain the previous position
    * will consider if it is a best practice
    ============================================*/
    if(global.GpsIdList==undefined||global.LocationList==undefined)
    {
        getPredefineDataResult = await DAL.GetGpsAndLocation();      // Read gpsID and location list from DB      
    }  

    if(getPredefineDataResult==1){

        for(let i=0;i<position.length;i++)
        {
            //push to position POOL for front end

            Business.RefreshGPSpool(position[i]);
            console.log(global.GPSpool);
            //Analyse position and refresh DB
            
            await PositionProcessor.Process(position[i]);
        }

    }else{                 
            console.log(`Error occurs when read predefined data from DB, check the Log file!`)
    }
    
});

/*========================================================
* Description: Processing received PIA 
*              Once receive a PIA, will validate first
               and then insert relevant data into DB
* use static/pia.html to test this API
 ========================================================*/

 router.post('/pia',async ctx=>{
    ctx.body=ctx.request.fields;
    console.log('being called'); // will Write to log file
    console.log(ctx.request.fields);

    //===============================
    //== Let's assume the coming PIA is like this
    let PIA=[{
        plantID:1, // for getting a routeID;
        gpsID:'1',
        routeID :3,
        legs:[{
        StartLocationID:2,
        EndLocationID:3,
        ExpectedArrivalTime: "2020-04-05 06:30:00",
        ExpectedDepartureTime : "2020-04-05 07:00:00",
        VariableCost:'9.0',
        FixedCost:'',
        EstimatedCost:0
        },{
        StartLocationID:3,
        EndLocationID:2,
        ExpectedArrivalTime: "2020-04-05 12:30:00",
        ExpectedDepartureTime : "2020-04-05 13:30:00",
        VariableCost:0,
        FixedCost:0,
        EstimatedCost:0
        },{
        StartLocationID:2,
        EndLocationID:1,
        ExpectedArrivalTime: "2020-04-05 17:30:00",
        ExpectedDepartureTime : "",
        VariableCost:0,
        FixedCost:0,
        EstimatedCost:0
        }]

    },{
        plantID:1, // for getting a routeID;
        gpsID:'2',
        routeID :4,
        legs:[{
        StartLocationID:2,
        EndLocationID:3,
        ExpectedArrivalTime: "2020-04-05 06:30:00",
        ExpectedDepartureTime : "2020-04-05 07:00:00",
        VariableCost:'9.0',
        FixedCost:'',
        EstimatedCost:0
        },{
        StartLocationID:3,
        EndLocationID:2,
        ExpectedArrivalTime: "2020-04-05 12:30:00",
        ExpectedDepartureTime : "2020-04-05 13:30:00",
        VariableCost:0,
        FixedCost:0,
        EstimatedCost:0
        },{
        StartLocationID:2,
        EndLocationID:1,
        ExpectedArrivalTime: "2020-04-05 17:30:00",
        ExpectedDepartureTime : "",
        VariableCost:0,
        FixedCost:0,
        EstimatedCost:0
        }]

    }]
    

// First, Cache plantID, locationID, GpsID to global for validate incoming PIA data

    let getPredefineDataResult = 1;

    if(global.GpsIdList==undefined||global.LocationIdList==undefined||global.PlantIdList==undefined)
    {
        getPredefineDataResult = await DAL.Get_GpsID_locationID_plantID();        // Read gpsID and location list from DB      
    }  

   // Here , use loop to parse the PIA into several Routes, and processing Route one after another
    if(getPredefineDataResult==1){ // either data at global or read from DB successfully

        // Validate PIA Data
        for (let i=0;i<PIA.length;i++)
        {
            await PiaProcessor.Process(PIA[i]);
        }//loop
            
    }
    else{
        console.log(`Error occurs when take predefined data from database, stop insert PIA data!! `)
    }

})

/*=================================
Description: Response all Locations
             preserved for future
===================================*/
router.get('/location',async ctx=>{
    
    let location =await ctx.db.query(`select * from Location`);
    global.loc=location;
    ctx.body=location;
})
/*=================================
Description: Response cache data
             preserved for testing
===================================*/
router.get('/loc',async ctx=>{
   console.log(`==== respond truck GPS ====`);
    ctx.body=global.GPSpool;
})


/*==========================================
Description: Response all Locations Interest
============================================*/
router.get('/truck',async ctx=>{
   
    let get=querystring.parse(ctx.querystring);
    let factory=get.factory;
    // Need validation
    let location =await ctx.db.query(`INSERT INTO plant (PlantName) VALUES ('${factory}')`);

    console.log(location);

    
    
})


/*==========================================
Description:used for test 
test URL:  http://localhost:9090/api/test?GPSid=1
============================================*/
    router.get('/test',async ctx=>{

    // async function getLegs(routeID){
   
    //     let myLegList=await ctx.db.query(`SELECT * From Leg WHERE RouteID = '${routeID}'`);
    //     console.log(`In the function and the legList is ${myLegList}`);
    //     return myLegList;
    // }

    // async function getLegID(GPSid){
    //     let myLegIDList = await ctx.db.query(`SELECT LegID FROM GPSGroup WHERE GPSID = '${GPSid}'`);
    //     let legID=myLegIDList[0].LegID;
    //     console.log(`In the function and the legID is ${legID}`);
    //     return legID
    // }

    // async function getRouteID(legID){
    //     let routeID = await ctx.db.query(`SELECT RouteID From Leg WHERE ID = '${legID}'`);
    //     console.log(`In the function and the routeID is ${routeID[0].RouteID}`);
    //     return routeID[0].RouteID;
    // }





    // async function getLegs(GPSid){
    //     let myLegIDList = await ctx.db.query(`SELECT LegID FROM GPSGroup WHERE GPSID = '${GPSid}'`);
    //     let legID=myLegIDList[0].LegID;
    //     console.log(legID);
    //     let routeID = await ctx.db.query(`SELECT RouteID From Leg WHERE ID = '${legID}'`);
    //     let myRouteID =routeID[0].RouteID;
    //     console.log(routeID);
    //     let myLegList=await ctx.db.query(`SELECT * From Leg WHERE RouteID = '${myRouteID}'`);
    //     console.log(myLegList);
    //     return myLegList;
    // }

// let x=await GetPreviousPosition(1,13)
//let x=await DAL.GetGpsIdList();
//let y= await DAL.GetGpsAndLocation();

//   let status = await DAL.UpdateActualArrivalTime(position.DateTime,currentLegID);
////console.log(`Update actual arrival time!`);
// Insert new leg status into Leg status table
//let status1 = await DAL.InsertLegStatus(legStatusType.Arrival,positionID,startLocationID)
//console.log(`Insert leg status !`);
// Update Gpsgroup table 's DateTimeStart field with this position's DateTime
//let status2 = await DAL.UpdateGpsGroupDateTimeStart(position.DateTime,currentLegID);  
//async UpdateStageZero(positionTime,legID,legStatusTypeID,positionID,startLocationID)
//UpdateStageZero(positionTime,legID,legStatusTypeID,positionID,startLocationID)


//let y= await DAL.UpdateStageZero('2019-10-12 1:24:00',47,5,247,2);

//console.log(x);


// if(global.PlantIdList==undefined)
// {
//    let result = await DAL.GetPlantIDs();                // Read gpsID and location list from DB
//     if(result!==0){                                             // 0 : Error occurs when access database
//         global.PlantIdList = result.map(item=>item.ID);       // Add gpsID list to global object 
//                           // Add Locations to global object
//     } else{
//         processStatus = false;                                  //  mark the whole process has error
//     }
// }  
// console.log(global.PlantIdList);
//let y = await DAL.InsertRouteID(1,2345)
// let y = await DAL.Get_GpsID_locationID_plantID();
// console.log(y[0].map(item=>item.ID));
// console.log(`===================`);
// console.log(y[1].map(item=>item.ID));
// console.log(`===================`);
// console.log(y[2].map(item=>item.ID));
// console.log(`===================`);


//let ID = await ctx.db.query(`INSERT Leg SET ?;SELECT LAST_INSERT_ID()`,{RouteID:1,StartLocationID:1,EndLocationID:2,ExpectedArrivalTime:'2019-10-12 1:24:00',ExpectedDepartureTime:'2019-10-12 1:24:00',OrderInRoute:1,VariableCost:0,FixedCost:0,EstimatedCost:0});
//let ID = await  DAL.GetGpsAndLocation();
 //let a={Latitude:43.4896, Longitude:-80.5196};
 //let b={Latitude:43.363524, Longitude:-80.316122};//combridge Mall
 //let b={Latitude:43.1062, Longitude:-85.1543};
 //let distance = await  Math.GetDistanceDurationFromBing(a, b) ;
 //console.log(distance);


//let previousPosition = await ctx.db.query(`CALL GetPreviousPosition(?,?)`,[1,25]) ;
//console.log(ID[1][0][`LAST_INSERT_ID()`]);
//console.log(previousPosition[0].length);

  //let a={Latitude: 43.520417, Longitude:-79.914407};
//  let b={Latitude: 43.525880, Longitude:-79.915297};

 //let b={Latitude: 43.525442, Longitude:-79.917609};
 //let b={Latitude: 43.525880, Longitude:-79.915297};

//let x=Math.GetAngle(a,b);
//console.log(x);
//let legs=[12,13,14];
//let currentLegIndexAndStage = Business.GetCurrentLegIndexAndStage(legs);
//let gpsID = await DAL.GetGpsIdByRouteId(13);
//console.log(currentLegIndexAndStage);
// let legID=13;
// let positionID=1;
// let locationID=2;
// let forecastDistance=23;
// let forecastDuration='01:30:20';
// let positionTime ='02:20:30';

// let result = await DAL.InsertDistanceMatrix(legID,positionID,locationID,forecastDistance,forecastDuration,positionTime);

// console.log(result);






    
    // let get=querystring.parse(ctx.querystring);
    // let GPSid=get.GPSid;
    // let legID=await DAL.getLegID(GPSid);

    // console.log(`legID id done:${legID}`);
    // let routeID=await DAL.getRouteID(legID);
    
    // console.log(`routeID id done ${routeID}`);
    // let legs=await DAL.getLegs(routeID);

    // console.log(`legs id dong`);
    // console.log(legs);


    let time = Math.MinutesToTimeFormat(60);
    console.log(time);

    });


/*==========================================
Description: Response Status based on GPSid
============================================*/
router.get('/statusByGpsID',async ctx=>{
    //ctx.body='plant';  used for testing
    // some logic here to determine the location list
    // test URL:  http://localhost:9090/api/statusByGpsID?GPSid=1
    //test URL: http://localhost:9090/api/truck?GPSID=1&LegID=1&Latitude=42.9999&Longitude=-82.9999&DateTime=12/11/2019  // HAVE ISSUE WITH INSERTION
    let get=querystring.parse(ctx.querystring);
    let GPSid=get.GPSid;
    let status = await Status.GetByGpsID(GPSid);
    ctx.body=status;

    console.log(status);
 
});
/*==========================================
Description: Response Status based on RouteID
============================================*/
router.get('/statusByRouteID',async ctx=>{
    //ctx.body='plant';  used for testing
    // some logic here to determine the location list
    // test URL:  http://localhost:9090/api/statusByRouteID?routeID=?
    //test URL: http://localhost:9090/api/truck?GPSID=1&LegID=1&Latitude=42.9999&Longitude=-82.9999&DateTime=12/11/2019  // HAVE ISSUE WITH INSERTION
    let get=querystring.parse(ctx.querystring);
    let routeID=get.routeID;
    // get the location list ready. Check the global first
    
    let status = await Status.GetByRouteID(routeID);
    ctx.body=status;

    console.log(status);
 
});
/*==========================================
Description: Response all Locations Interest
============================================*/
// router.get('/truck/:GPSid/:LegID/:Latitude/:Longitude/:DateTime',async ctx=>{
//     //ctx.body='plant';  used for testing
//     // some logic here to determine the location list
//     // test URL:  http://localhost:9090/api/truck/1/2/43.5205/-79.9075/12-11-2019
//    // let location =await ctx.db.query(`INSERT INTO position (GPSID,LegID,Latitude,Longitude,DateTime) VALUES ('${ctx.params.GPSid}','${ctx.params.LegID}','${ctx.params.Latitude}','${ctx.params.Longitude}','${ctx.params.DateTime}')`);
//     // push the location list to global.location 

//     // determine legID by the GPSi
    
//     console.log(ctx.params);
//     ctx.body=ctx.params;
    
    
// })
// response for 'params' patten parameters
// usage:  url:  host/api/truck/9  ==> {"id":"9"}
// router.get('/truck/:id',async ctx=>{
    
//     console.log(ctx.query);
//     ctx.body=ctx.params;
    
// })
// response for 'urlencoded' patten parameters
// usage:  url:  host/api/truck?a= 9  ==> {"a":"9"}
// router.get('/truck',async ctx=>{
    
//     console.log(ctx.query);
//     ctx.body=app.context.loc;
    
// })
// Here to deal with coming Position

// usage:   url=>  host/api/truck/9/7 ==> {"id":"9","id2":"7"}
// router.get('/truck/:GPSid/:Latitude/:Longitude/:DateTime',async ctx=>{
//     //ctx.body='plant';  used for testing
//     console.log(ctx.params);
//     ctx.body=ctx.params;
    
    
// })

// usage:   POST method  for receive PIA's JSON file
// use static/PIA.html to submit this PIA's JSON file
router.post('/uploadPIA',async ctx=>{
    // ctx.body=ctx.request.fields;
    console.log(ctx.request.fields);
    let {jsonFile}=ctx.request.fields;
    //console.log(jsonFile);
    console.log(jsonFile.length);
    console.log(jsonFile[0].path);
    // read the uploaded JSON file
    let data=  JSON.parse((await fs.readFile(jsonFile[0].path)).toString());
    //let data=  (await fs.readFile(jsonFile[0].path));
    //console.log(data);
    let {dispatcher, date,routes}=data;
    
    console.log(`dispatcher is ${dispatcher}`);
    console.log(`upload date is ${date}`);
    console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
    routes.forEach((v,i)=>{
        console.log(`=================================`);
        console.log(`route  ${i+1}:`);
        console.log(`the truckName is : ${v.truckName} `);
        console.log(`the GPSid is : ${v.GPSid} `);
        (v.steps).forEach((m,j)=>{
            console.log(`------------------------`);
            console.log(`route ${i+1}, step: ${j+1} :`);
            console.log(`locationName is : ${m.locationName}`);
            console.log(`ArriveS is :${m.ArriveS}`);
            console.log(`Depart is :${m.Depart}`);
            console.log(`LoadingTime is :${m.LoadingTime}`);
            console.log(`TransitTime is :${m.TransitTime}`);
            console.log(`DeliverLocation is :${m.DeliverLocation}`);
            console.log(`ArriveE is :${m.ArriveE}`);
            console.log(`Cost is :${m.Cost}`);
            
        })
    });
// validation



// Insertion



    ctx.body='upload successfully!';
})




module.exports=router.routes();



