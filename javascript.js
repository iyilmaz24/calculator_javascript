
window.addEventListener("DOMContentLoaded", () => {

    inputText = document.getElementById("inputText")
    outputText = document.getElementById("outputText")
    
    operatorButtons = document.getElementsByClassName("toggle")
    percentButton = document.getElementById("percent")
    decimalButton = document.getElementById("decimal")

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
        // only 1 operator per calculation
        else if(event.target.value in operators){
            removeListenerOperators()
            decimalButton.addEventListener("click", addInput)
            percentButton.addEventListener("click", addInput)
            inputText.textContent += event.target.value
        }
        else{
            // only allow 1 percent or decimal per side of operator
            if(event.target.value === "."){
                decimalButton.removeEventListener("click", addInput)
            }
            else if(event.target.value === "%")
            {
                percentButton.removeEventListener("click", addInput)
            }
            inputText.textContent += event.target.value
        }
    } 

    buttons = document.getElementsByClassName("buttonDisplay");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", addInput)
    }

    acButton = document.getElementById("ac-btn")
    acButton.addEventListener("click", () => {
        inputText.textContent = ""
        outputText.textContent = ""
    })

    delButton = document.getElementById("del-btn")
    delButton.addEventListener("click", () => {
        // if an operator is being deleted, we need to slice off last 3 chars
        if(inputText.textContent.length > 0 && inputText.textContent.slice(-1) === " "){
            inputText.textContent = inputText.textContent.slice(0, -3)
        }
        else{
            inputText.textContent = inputText.textContent.slice(0, -1)
        }
    })

    // split by spaces to seperate operator and the left and right side numbers
    function calculate(inputString){
        splitInput = inputString.split(" ")
        switch(splitInput[1]){
            case "+":
                return parseFloat(splitInput[0]) + parseFloat(splitInput[2])
            case "-":
                return parseFloat(splitInput[0]) - parseFloat(splitInput[2])
            case "x":
                return parseFloat(splitInput[0]) * parseFloat(splitInput[2])
            case "/":
                return parseFloat(splitInput[0]) / parseFloat(splitInput[2])
        }
    }

    equalButton = document.getElementById("extraWideButton")
    equalButton.addEventListener("click", () => {
        outputText.textContent = calculate(inputText.textContent)
        inputText.textContent = ""
        addListenerOperators()
        decimalButton.addEventListener("click", addInput)
        percentButton.addEventListener("click", addInput)
    })

});


// add percentage sign button functionality ( num / 100)