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
    if ((firstNum === undefined || firstNum === "") || (secondNum === undefined || secondNum === "")) {
        return firstNum ?? secondNum
    }

    let firstNumVar = Number(firstNum)
    let secondNumVar = Number(secondNum)
    let result

    switch (operator) {
        case "+":
            return infintyHandler(add(firstNumVar, secondNumVar))
        case "-":
            return infintyHandler(subtract(firstNumVar, secondNumVar))
        case "x":
            return infintyHandler(multiply(firstNumVar, secondNumVar))
        case "/":
            return infintyHandler(divide(firstNumVar, secondNumVar))
    }

  
}

const numbpad = document.querySelector(".numpad")
const num = document.querySelector(".num")

let prev 
let current = ""
let operator

numbpad.addEventListener("click", (event) => {
    let target = event.target
    let targetClass = target.classList.value

    if (targetClass == "operator-btn" && (isDefined(prev) && isDefined(current) && isDefined(operator))) {
        let result = operate(prev, operator, current)
        current = ""
        prev = result
        operator = target.textContent
        num.textContent = prev
    } else if (targetClass == "operator-btn" && isDefined(current)) {
        operator = target.textContent
        prev = current
        current = ""
        num.textContent = current
    } else if (targetClass == "num-btn" || targetClass == "num-btn zero") {
        current += target.textContent
        num.textContent = current
    } else if (targetClass == "operator-btn equal" && (isDefined(prev) && isDefined(current) && isDefined(operator))) {
        let result = operate(prev, operator, current)
        current = result
        prev = ""
        operator = ""
        num.textContent = current
    } else if (targetClass == "num-btn clear") {
        current = ""
        operator = ""
        prev = ""
        num.textContent = current
    } else if (targetClass == "operator-btn back" && isDefined(current)) {
        if (current == "Error") {
            current = ""
        }
        let temp = current.toString().split("")
        let remTemp = temp.pop()

        current = temp.join("")
        num.textContent = current
    }
    
    console.log(`${prev} ${operator} ${current} = ${prev}`)
    
})

function isDefined(item) {
    if (item === undefined || item === "" || item === null) {
        return false
    } else {
        return true
    }
}

function infintyHandler(value) {
    if (value == Infinity) {
        return "Error"
    } else {
        return value
    }
}