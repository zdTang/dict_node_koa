/*====================================================================
Discription: encrypo a string with MD5
FileName: common.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : Jan 30, 2020
=====================================================================*/

// Make sure to install 'crypto' package

const crypto=require('crypto');

module.exports={
    md5(buffer){

        let obj=crypto.createHash('md5');
        obj.update(buffer);
        //'hex' will return a HEX string
        return obj.digest('hex');// not 'hax'
    },
    /*=========================================================
    name: InsertAndGetRouteID
    description: insert a route and return a row id as Route ID
    =========================================================== */
    getCurrentLegID(legs){
        for(let i=0;i<legs.length;i++)
        {
            // legs' sequence order must from low to high
            // condition 1:  current Actual Arrival Time == null   : not come
            // condition 2:  come  and not leave
            // condition 3:  leave but not reach to next leg
            let currentLegID=0;
            if((legs[i].ActualArriveTime==null)||((legs[i].ActualArriveTime!=null)&&(legs[i].ActualDepartureTime==null))||((legs[i].ActualDepartureTime==null)&&(legs[i+1].ActualArriveTime==null)))
            {
                currentLegID=legs[i].ID;  
            }
        }

        return currentLegID;
    },

    /*=========================================================
    name: GetCoordinateByLocationID
    description: insert a route and return a row id as Route ID
    =========================================================== */
    GetCoordinateByLocationID(id, locationList){
        // locationList.forEach((v) => {if(v.ID==id){
        //     return {Latitude:v.Latitude, Longitude: v.Longitude};
        // }})
        for(let i=0;i<locationList.length;i++){
            if(locationList[i].ID==id)
            {
                return {Latitude:locationList[i].Latitude, Longitude: locationList[i].Longitude};
            }
        }

    },
    /*=========================================================
    name: GetLocationByLocationID
    description: insert a route and return a row id as Route ID
    =========================================================== */
    GetLocationByLocationID(id, locationList){
        // locationList.forEach((v) => {if(v.ID==id){
        //     return {Latitude:v.Latitude, Longitude: v.Longitude};
        // }})
        for(let i=0;i<locationList.length;i++){
            if(locationList[i].ID==id)
            {
                return locationList[i];
            }
        }

    }



};