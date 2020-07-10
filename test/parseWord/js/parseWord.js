$(function(){


    function appendElement (letter,currentElement) { 
        // create a new div element 
        var newDiv = document.createElement("div"); 
        // and give it some content 
        var newContent = document.createTextNode(letter); 
        // add the text node to the newly created div
        newDiv.appendChild(newContent);  
        // add the attribute to the newly created div
        newDiv.setAttribute("class", "letter");
        
        // add the newly created element and its content into the DOM 
        var currentDiv = document.getElementById(currentElement); 
        document.body.appendChild(newDiv, currentDiv);
        //document.body.in(newDiv, currentDiv);
        }





    let word="beautiful";
    let one =word.toUpperCase().charAt(1);
    let dock=document.getElementsByClassName("dock");
   // alert(dock);
    //console.log(dock);
    for(let i=0;i<word.length;i++){
        appendElement(word.toUpperCase().charAt(i),"dock")
    }

    let letter=document.getElementsByClassName("letter");

    //alert(letter.length);

    for(let i=0;i<letter.length;i++){
        // bind eventListener  
        letter[i].addEventListener("click", function(){
        let a=this.innerHTML
        alert(a);
    })
}
});

    






