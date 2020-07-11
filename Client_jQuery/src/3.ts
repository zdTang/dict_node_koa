import $ from "jquery";
//import Jquery
function target(x:any):void{
    let o=$(x);
    o.click(()=>{
        alert(o)
    })
}

target("#name");