// validation module
// const Path=require('path');
// const Validator=require(Path.resolve(__dirname,'./validator'));
module.exports={
  
  // validate user name

  // let err=validatator.username();
  username(user){
    if(!user){
      return 'User name cannot be empty';
    }else if(user.length>32){
      return 'The length of user name is 32';
    }else if(!/^\w{4,32}$/.test(user)){
      return 'Wrong format';
    }else{
      return null; //  no error
    }
  },


  // validate password
  password(password){
    if(!password){
      return 'Password cannot be empty';
    }else if(password.length>32){
      return 'Password is no more than 32';
    }else{
      return null;   // no error
    }
  },
  
  // validate DateTime data type
  //Determine if the string is  YYYY-MM-DD hh:mm:ss format
  // Credit:  https://blog.csdn.net/youyou_yo/article/details/51506978   
IsDateTime(data){     
      let str = data.trim();
      let result = true;   
      if(str.length!=0){    
          let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;     
          let r = str.match(reg);     
          if(r==null)    
          console.log ('IsDateTime() ===>The data is not a DateTime format string!!!'); //请将“日期”改成你需要验证的属性名称!    
          return result;
      }    
  },
  
  // validate Route before insert into DB
  // Input:    Route object
  // Return:   number
  // true
  // false
  ValidateRoute(route){  
    let plant_id=route.plantID;
    let gps_id=route.gpsID;
    let legArray=route.legs;
    //Do I need to validate if the routeID is unique?
    // validate gpsID and plantID
    if(!global.GpsIdList.includes(gps_id) || !global.PlantIdList.includes(plant_id)) 
    {
      return -1;  // illegal gpsID or plantID
    }

    for(let i=0;i<legArray.length;i++){
        
      //============number data type
      //let routeID = legArray[i].routeID;  // maybe the Karmax will give a RouteID or just use the Row number of new route
      let startLocationID = legArray[i].StartLocationID;
      let endLocationID = legArray[i].EndLocationID;
      let variableCost = legArray[i].VariableCost;
      let fixedCost = legArray[i].FixedCost;
      let estimatedCost = legArray[i].EstimatedCost;
          //=============DateTime string
      let expectedArrivalTime = legArray[i].ExpectedArrivalTime;
      let expectedDepartureTime = legArray[i].ExpectedDepartureTime;
          //===validate number date type, make sure it is a number or a string of number
          if(isNaN(startLocationID)||isNaN(endLocationID)||isNaN(variableCost)||isNaN(fixedCost)||isNaN(estimatedCost)){
              console.log(`InsertLegs()==>Expected a number, make sure the data type!`);
              return -2;  // illegal locationID or Cost Data type .
          };
          
           // ===check if locationID is legal

          if(!global.LocationIdList.includes(startLocationID)||!global.LocationIdList.includes(endLocationID)){
              console.log(`InsertLegs()==>locationID doesn't exist!`);
              return -3;  // illegal locationID value.   
          } 

          //===validate DateTime string

          if (i<legArray.length-1){  //not the last leg
              if(!this.IsDateTime(expectedArrivalTime)||!this.IsDateTime(expectedDepartureTime)){
                  console.log(`InsertLegs()==>Expected a DateTime, make sure the data type!`);
                  return -4;  // Data type has error.
              }   
          }else{  // For the last leg,  the ExpectedDepartureTime will be ignored
              if(!this.IsDateTime(expectedArrivalTime)){
                  console.log(`InsertLegs()==>Expected a DateTime, make sure the data type!`);
                  return -4; }// Data type has error.
          }
   }   

      return 1; //  Passed ! Good! 
  }    
  
  



};
