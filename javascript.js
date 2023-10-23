
window.addEventListener("DOMContentLoaded", () => {

    inputText = document.getElementById("inputText")
    outputText = document.getElementById("outputText")

    buttons = document.getElementsByClassName("buttonDisplay");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", (event) => {
            // can only start calculation with decimal operator or number
            if(inputText.textContent.length === 0){
                if(!(isNaN(event.target.value)) || event.target.value === "."){
                    inputText.textContent += event.target.value
                }
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

        })
    }

    acButton = document.getElementById("ac-btn")
    acButton.addEventListener("click", () => {
        inputText.textContent = ""
        outputText.textContent = ""
    })

    delButton = document.getElementById("del-btn")
    delButton.addEventListener("click", () => {
        if(inputText.textContent.length > 0){
            inputText.textContent = inputText.textContent.slice(0, -1)
        }
    })

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
    })

});


