const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const digit = document.querySelector(".digits");
let newline = true;
let temp = 0;
let ans = 0;
let testEvent = null;


function numberClick(e) {
    if (newline){
        temp = parseInt(digit.textContent);
        digit.textContent = e["originalTarget"]["value"];
        newline = false;
    }else if (digit.textContent==="0"){
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
            temp = parseInt(digit.textContent)
            ans = factorial(++temp);
            temp = ans;
            digit.textContent = temp;
            break;
        default:
            if(!!temp){ /* !!temp means true if temp has any value other than 0 */
                switch(e["originalTarget"]["id"]){
                    case "sum":
                        ans = summary(temp, parseInt(digit.textContent));
                        break;
                }
                digit.textContent = ans;
                newline = true;
            } else {
                temp = parseInt(digit.textContent);
                newline = true;
            }
    }
}

function summary(first, second){
    return first+second;
}

function backSpace(){
    if(digit.textContent!="0"){
        if(digit.textContent.length>1) digit.textContent = digit.textContent.slice(0, -1);
        else digit.textContent = "0";
    }
}

function deleteFunct(){
    digit.textContent = "0";
    temp = 0;
    ans = 0;
    newline = true;
}

function factorial(number){
    let answer = 1;
    for(let i = 1; i<number; i++){
        answer = answer*i;
    }
    newline = true;
    return answer;
}
    
operatorBtn.forEach(operator => operator.addEventListener("click", operatorClick));
numberBtn.forEach(number => number.addEventListener("click", numberClick));