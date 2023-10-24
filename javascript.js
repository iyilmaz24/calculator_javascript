
window.addEventListener("DOMContentLoaded", () => {

    inputText = document.getElementById("inputText")
    outputText = document.getElementById("outputText")
    
    operatorButtons = document.getElementsByClassName("toggle")
    percentButton = document.getElementById("percent")
    decimalButton = document.getElementById("decimal")
    numberButtons = document.getElementsByClassName("numberBtn")

    function removeListenerOperators(){
        for(let i = 0; i < operatorButtons.length; i++){
            operatorButtons[i].removeEventListener("click", addInput)
        }
    }

    function addListenerOperators(){
        for(let i = 0; i < operatorButtons.length; i++){
            operatorButtons[i].addEventListener("click", addInput)
        }
    }
    
    operators = {
        " x " : null,
        " / ": null,
        " + " : null,
        " - ": null,
    }

    function addInput(event){
        // can only start calculation with decimal operator or number
        if(inputText.textContent.length === 0){
            if(!(isNaN(event.target.value)) || event.target.value === "."){
                // catch edge case, only 1 decimal per side of operator
                if(event.target.value === "."){
                    decimalButton.removeEventListener("click", addInput)
                }
                inputText.textContent += event.target.value
            }
        }
        // only 1 operator per calculation, reset all event listeners after operator input
        else if(event.target.value in operators){
            removeListenerOperators()
            decimalButton.addEventListener("click", addInput)
            percentButton.addEventListener("click", addInput)
            for(let i = 0; i < numberButtons.length; i++){
                numberButtons[i].addEventListener("click", addInput)
            }
            inputText.textContent += event.target.value
        }
        else{
            // only allow 1 percent or decimal per side of operator
            if(event.target.value === "."){
                decimalButton.removeEventListener("click", addInput)
            }
            // do not allowing typing of anything past "%" except operator if applicable
            else if(event.target.value === "%")
            {
                percentButton.removeEventListener("click", addInput)
                decimalButton.removeEventListener("click", addInput)
                for(let i = 0; i < numberButtons.length; i++){
                    numberButtons[i].removeEventListener("click", addInput)
                }
            }
            inputText.textContent += event.target.value
        }
    } 

    buttons = document.getElementsByClassName("buttonDisplay");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", addInput)
    }

    // reset everything to default when AC button is clicked
    acButton = document.getElementById("ac-btn")
    acButton.addEventListener("click", () => {
        inputText.textContent = ""
        outputText.textContent = ""
        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", addInput)
        }
    })

    delButton = document.getElementById("del-btn")
    delButton.addEventListener("click", () => {
        // if an operator is being deleted, we need to slice off last 3 chars
        if(inputText.textContent.length > 0 && inputText.textContent.slice(-1) === " "){
            inputText.textContent = inputText.textContent.slice(0, -3)
            addListenerOperators()
        }
        else if(inputText.textContent.length > 0 && inputText.textContent.slice(-1) === "."){
            inputText.textContent = inputText.textContent.slice(0, -1)
            decimalButton.addEventListener("click", addInput)
        }
        else if(inputText.textContent.length > 0 && inputText.textContent.slice(-1) === "%"){
            inputText.textContent = inputText.textContent.slice(0, -1)
            percentButton.addEventListener("click", addInput)
            decimalButton.addEventListener("click", addInput)
            for(let i = 0; i < numberButtons.length; i++){
                numberButtons[i].addEventListener("click", addInput)
            }
        }
        else{
            inputText.textContent = inputText.textContent.slice(0, -1)
        }
    })

    // split by spaces to seperate operator and the left and right side numbers
    function calculate(inputString){
        splitInput = inputString.split(" ") 
        num1 = parseFloat(splitInput[0])
        operator = splitInput[1]
        num2 = parseFloat(splitInput[2])

        if("%" === splitInput[0].slice(-1)){
            num1 /= 100
        }
        if("%" === splitInput[2].slice(-1)){
            num2 /= 100
        }

        switch(operator){
            case "+":
                return num1 + num2
            case "-":
                return num1 - num2
            case "x":
                return num1 * num2
            case "/":
                return num1 / num2
        }
    }

    equalButton = document.getElementById("extraWideButton")
    equalButton.addEventListener("click", () => {
        outputText.textContent = calculate(inputText.textContent)
        inputText.textContent = ""
        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", addInput)
        }
    })

});
