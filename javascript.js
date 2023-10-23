
window.addEventListener("DOMContentLoaded", () => {

    inputText = document.getElementById("inputText")
    outputText = document.getElementById("outputText")

    buttons = document.getElementsByClassName("buttonDisplay");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", (event) => {
            inputText.textContent += event.target.value
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

    equalButton = document.getElementById("extraWideButton")
    equalButton.addEventListener("click", () => {
        outputText.textContent = "insert result here"
    })

});


