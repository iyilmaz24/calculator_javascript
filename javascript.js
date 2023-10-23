
window.addEventListener("DOMContentLoaded", () => {

    inputText = document.getElementById("inputText")
    outputText = document.getElementById("outputText")

    buttons = document.getElementsByClassName("buttonDisplay");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", (event) => {
            inputText.textContent += event.target.value
        })
    }

    equalButton = document.getElementById("extraWideButton")

    acButton = document.getElementById("ac-btn")

    cButton = document.getElementById("c-btn")

    console.log(equalButton)
    console.log(acButton)
    console.log(cButton)

});


