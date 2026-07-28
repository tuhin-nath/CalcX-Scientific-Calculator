// ==========================
// Variables
// ==========================


let currentInput = "";

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];



const currentValue = document.getElementById("current-value");

const previousValue = document.getElementById("previous-value");

const historyList = document.getElementById("history-list");

const themeButton = document.getElementById("theme-btn");




// ==========================
// Display Update
// ==========================


function updateDisplay(){

    currentValue.innerText = currentInput || "0";

}




// ==========================
// Insert Values
// ==========================


function insertValue(value){

    currentInput += value;

    updateDisplay();

}




// ==========================
// Clear Display
// ==========================


function clearDisplay(){

    currentInput = "";

    previousValue.innerText = "";

    updateDisplay();

}




// ==========================
// Delete Last Character
// ==========================


function deleteNumber(){

    currentInput = currentInput.slice(0,-1);

    updateDisplay();

}




// ==========================
// Calculate
// ==========================


function calculate(){


    try{


        let expression = currentInput;


        let result = eval(expression);



        previousValue.innerText = expression + " =";

        currentInput = result.toString();



        addHistory(expression,result);



        updateDisplay();



    }

    catch(error){


        currentInput = "Error";

        updateDisplay();


    }



}






// ==========================
// Scientific Functions
// ==========================


function scientificFunction(type){


    let value = Number(currentInput);



    if(isNaN(value)){

        return;

    }



    let result;



    switch(type){


        case "sin":

            result = Math.sin(value * Math.PI / 180);

            break;



        case "cos":

            result = Math.cos(value * Math.PI / 180);

            break;



        case "tan":

            result = Math.tan(value * Math.PI / 180);

            break;



        case "sqrt":

            result = Math.sqrt(value);

            break;



        case "log":

            result = Math.log10(value);

            break;



        case "ln":

            result = Math.log(value);

            break;



    }



    addHistory(type+"("+value+")",result);



    currentInput = result.toString();



    updateDisplay();



}






// ==========================
// History System
// ==========================


function addHistory(expression,result){


    let calculation = {

        expression:expression,

        result:result

    };



    history.push(calculation);



    localStorage.setItem(

        "calcHistory",

        JSON.stringify(history)

    );



    displayHistory();



}




function displayHistory(){


    historyList.innerHTML = "";



    history.reverse();



    history.slice(0,10).forEach(item=>{


        let li=document.createElement("li");


        li.innerText =

        `${item.expression} = ${item.result}`;



        historyList.appendChild(li);


    });



    history.reverse();


}




function clearHistory(){


    history=[];


    localStorage.removeItem("calcHistory");


    displayHistory();


}






// ==========================
// Dark Mode
// ==========================


themeButton.addEventListener(

"click",

()=>{


    document.body.classList.toggle("dark");



    if(document.body.classList.contains("dark")){


        themeButton.innerText="☀ Light Mode";


    }

    else{


        themeButton.innerText="🌙 Dark Mode";


    }



}

);






// ==========================
// Keyboard Support
// ==========================


document.addEventListener(

"keydown",

(event)=>{


    let key = event.key;



    if(

        (key>="0" && key<="9")

        ||

        key==="."

        ||

        key==="+" 

        ||

        key==="-" 

        ||

        key==="*" 

        ||

        key==="/"

    ){


        insertValue(key);


    }



    else if(key==="Enter"){


        calculate();


    }



    else if(key==="Backspace"){


        deleteNumber();


    }



    else if(key==="Escape"){


        clearDisplay();


    }



}

);





// Load history when page opens

displayHistory();