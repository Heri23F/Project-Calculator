// Function for basic math

// add
function add(firstNum, secondNum) {
    return firstNum + secondNum
}

// subtract
function subtract(firstNum, secondNum) {
    return firstNum - secondNum
}

// multiply
function multiply(firstNum, secondNum) {
    return firstNum * secondNum
}

// divide
function divide(firstNum, secondNum) {
    return firstNum / secondNum
}

function operate (firstNum, operator, secondNum) {
    let firstNumVar = Number(firstNum)
    let secondNumVar = Number(secondNum)
    let operatorVar = operator

    switch (operatorVar) {
        case "+":
            return add(firstNumVar, secondNumVar)
        case "-":
            return subtract(firstNumVar, secondNumVar)
        case "x":
            return multiply(firstNumVar, secondNumVar)
        case "/":
            return divide(firstNumVar, secondNumVar)
    }

}

let numbpad = document.querySelector(".numpad")
let num = document.querySelector(".num")
let temp = []
numbpad.addEventListener("click", (events) => {
    let target = events.target
    temp.push(target.textContent)
    console.log(temp)
})

