const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const digit = document.querySelector(".digits");
const commaBtn = document.querySelector(".decimal");
let newline = true;
let lastOperation = null;
let temp = 0;
let ans = 0;

let testEvent = null;


function numberClick(e) {
    if (newline){
        temp = parseFloat(digit.textContent);
        digit.textContent = e["originalTarget"]["value"];
        newline = false;
    } else if (digit.textContent==="0"){
        digit.textContent = e["originalTarget"]["value"];
    }else if(digit.textContent.length < 6){
        digit.textContent += e["originalTarget"]["value"];
    }
}
function operatorClick(e){
    switch(e["originalTarget"]["id"]){
        case "backspace":
            backSpace();
            break;
        case "delete":
            deleteFunct();
            break;
        case "factorial":
            temp = parseFloat(digit.textContent)
            ans = factorial(++temp);
            temp = ans;
            digit.textContent = temp;
            break;
        case "plusminus":
            if(digit.textContent == "0") break;
            else if(digit.textContent[0] != "-") digit.textContent = "-" + digit.textContent;
            else digit.textContent = digit.textContent.slice(1);
            break;
        default:
            if(!!temp && !!lastOperation){ /* !!temp & !!lastOperation means true if they have any value other than 0 or null */
                switch(lastOperation){
                    case "sum":
                        ans = temp + parseFloat(digit.textContent);
                        break;
                    case "multi":
                        ans = temp * parseFloat(digit.textContent);
                        break;
                    case "subs":
                        ans = temp - parseFloat(digit.textContent);
                        break;
                    case "divide":
                        if(parseFloat(digit.textContent)) ans = temp / parseFloat(digit.textContent);
                        else ans = "111111111"; // Triggers the if at 63th line to delete everything and print error.
                        break;
                }
                lastOperation = e["originalTarget"]["id"];
                newline = true;
                ans = Math.round(ans * 10)/10;
                if(ans.toString().length > 6){
                    deleteFunct()
                    ans = "ERROR";
                }
                digit.textContent = ans;
            } else {
                lastOperation = e["originalTarget"]["id"];
                newline = true;
                temp = parseFloat(digit.textContent);
            }
    }
}

function commaShit(){
    let hasComma = digit.textContent.includes(".");
    if(!hasComma){
        digit.textContent = digit.textContent + ".";
        newline = false;
    } else if (digit.textContent[digit.textContent.length-1] == "."){
        console.log("it has comma at the end.");
        backSpace();
    } else {
        console.log("it has comma somewhere");
    }
}

function backSpace(){
    if(digit.textContent!="0"){
        if(digit.textContent.length>1) digit.textContent = digit.textContent.slice(0, -1);
        else digit.textContent = "0";
    }
}

function deleteFunct(){
    digit.textContent = "0";
    newline = true;
    lastOperation = null;
    temp = 0;
    ans = 0;
}

function factorial(number){
    let answer = 1;
    for(let i = 1; i<number; i++){
        answer = answer*i;
    }
    newline = true;
    return answer;
}

commaBtn.addEventListener("click", commaShit);
operatorBtn.forEach(operator => operator.addEventListener("click", operatorClick));
numberBtn.forEach(number => number.addEventListener("click", numberClick));