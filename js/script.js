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
            return (add(firstNumVar, secondNumVar))
        case "-":
            return (subtract(firstNumVar, secondNumVar))
        case "x":
            return (multiply(firstNumVar, secondNumVar))
        case "/":
            return (divide(firstNumVar, secondNumVar))
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
    let defined = isDefined(prev) && isDefined(current) && isDefined(operator)
    
    if (targetClass == "operator-btn" && defined && current !== "-") {
        let result = operate(prev, operator, current)
        current = ""
        prev = result
        operator = target.textContent
        infintyHandler(prev)
    }else if (targetClass == "operator-btn" && isDefined(prev) && !isDefined(operator) && target.textContent == "-") {
        current = ""
        operator = target.textContent
        num.textContent = current
    }
     else if (targetClass == "operator-btn" && !isDefined(current) && target.textContent == "-") {
        current += target.textContent
        num.textContent = current
    } else if (targetClass == "operator-btn" && current == "-") {
        current = ""
        operator = target.textContent
        num.textContent = current
    }
    else if (targetClass == "operator-btn" && isDefined(prev)) {
        operator = target.textContent
        num.textContent = current
    }else if (targetClass == "operator-btn" && isDefined(current)) {
        operator = target.textContent
        prev = current
        current = ""
        num.textContent = current
    } else if (targetClass == "num-btn" && isDefined(prev) && !isDefined(operator)) {
        prev = ""
        current += target.textContent
        num.textContent = current
    }else if (targetClass == "num-btn") {
        current += target.textContent
        num.textContent = current
    } else if (targetClass == "operator-btn equal" && defined && current !== "-") {
        let result = operate(prev, operator, current)
        current = ""
        prev = result
        operator = ""
        infintyHandler(prev)
    } else if (targetClass == "num-btn clear") {
        current = ""
        operator = ""
        prev = ""
        num.textContent = current
    } else if (targetClass == "operator-btn back" && current !== undefined) {
        if (current == "Error") {
            current = ""
        }
        let temp = current.toString().split("")
        let remTemp = temp.pop()

        current = temp.join("")
        num.textContent = current
    } else if (targetClass == "num-btn point" && isDefined(current) && !current.includes(".")) {
        current += target.textContent
        num.textContent = current
    }
    
    console.log(`${prev} ${operator} ${current} = ${prev}`)
    
})

function isDefined(item) {
    if (item === undefined || item === "" || item === null || item === "Error") {
        return false
    } else {
        return true
    }
}

function infintyHandler(value) {
    if (value == Infinity) {
        num.textContent = "Error"
        prev = ""
        operator = ""

    } else {
        num.textContent = rounded(value)
    }
}

function rounded(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000
}

