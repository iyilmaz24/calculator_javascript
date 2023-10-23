
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
    })

});


// add percentage sign button functionality ( num / 100)
// limit to 1 operator per calculation
// limit to one "." or "%" per side of operator