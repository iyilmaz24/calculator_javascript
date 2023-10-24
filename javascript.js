
window.addEventListener("DOMContentLoaded", () => {

    inputText = document.getElementById("inputText")
    outputText = document.getElementById("outputText")

    operatorButtons = document.getElementsByClassName("toggle")
    percentDecimalButtons = document.getElementsByClassName("toggle2")

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

    function removeListenerPercentDecimal(){
        for(let i = 0; i < percentDecimalButtons.length; i++){
            percentDecimalButtons[i].removeEventListener("click", addInput)
        }
    }

    function addListenerPercentDecimal(){
        for(let i = 0; i < percentDecimalButtons.length; i++){
            percentDecimalButtons[i].addEventListener("click", addInput)
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
                inputText.textContent += event.target.value
            }
        }
        // only 1 operator per calculation
        else if(event.target.value in operators){
            removeListenerOperators()
            inputText.textContent += event.target.value
        }
        // if last input was decimal operator, do not allow input of another one
        else if(inputText.textContent.slice(-1) === "."){
            if(event.target.value !== "."){
                inputText.textContent += event.target.value
            }
        }
        else{
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

    // split by spaces to seperate operator and the left and right numbers
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
    })

});


// add percentage sign button functionality ( num / 100)
// limit to 1 operator per calculation
// limit to one "." or "%" per side of operator