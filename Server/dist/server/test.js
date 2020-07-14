let Math=require(`../libs/Math`);
let DAL=require('../libs/DAL');
let Business=require('../libs/Business');

//HOLBEACH: 43.4896,-80.5196
//Wilfrid Laurier:43.4744, -80.5299
// let result=Math.GetDistance(43.4896,-80.5196,43.4744,-80.5299);
// console.log(result);

// let a=[2,3,4];
// if(a>0)
// {
//     console.log(`big`);
// }else{
//     console.log(`small`);
// }
async()=>{
    let legs= await DAL.GetLegs(34);
    console.log(legs);
    let status= Business.GetCurrentLegIndexAndStage(legs);
    console.log(status);

};
