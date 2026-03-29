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

function operate (obj) { 
    let firstNumVar = Number(obj.current)
    let secondNumVar = Number(obj.input)
    let result 

    switch (obj.operator) {
        case "+":
            result = (add(firstNumVar, secondNumVar))
            obj.result = result
            return
            
        case "-":
            result = (subtract(firstNumVar, secondNumVar))
            obj.result = result
            return
        case "x":
            result = (multiply(firstNumVar, secondNumVar))
            obj.result = result
            return
            
        case "/":
            result = (divide(firstNumVar, secondNumVar))
            obj.result = result
            return
            
    }

  
}

const numbpad = document.querySelector(".numpad")
const num = document.querySelector(".num")

let objMath = {
    current: null,
    input: null,
    operator: null,
    state: "firstInput",
}

function isEmpty(item) {
    if (item === undefined || item === null) return true
    return false
}

function getFirstInput(button, value, obj) {

    // Handle Number Input
    if (button === "num-btn" && isEmpty(obj.input)) return obj.input = value
    if (button === "num-btn") return obj.input += value

    // Handle minus input
    if (button === "operator-btn" && isEmpty(obj.input) && value === "-") return obj.input = value
    if (button === "operator-btn" && obj.input === "-" && value === "-") return obj.input = null

    // Handle second input after user press operator button
    if (button === "operator-btn" && isEmpty(obj.current)) {
        obj.current = obj.input
        obj.input = null
        obj.operator = value
        obj.state = "secondInput"
        return
    }

}

function getSecondInput (button, value, obj) {

    // handle operator change
    if (button === "operator-btn" && !isEmpty(obj.operator) && isEmpty(obj.input)) return obj.operator = value

    // Handle Number Input
    if (button === "num-btn" && isEmpty(obj.input)) return obj.input = value
    if (button === "num-btn") return obj.input += value

    // Handle minus input
    if (button === "operator-btn" && isEmpty(obj.input) && value === "-") return obj.input = value

    // Handle Last input after user press operator button
    if (button === "operator-btn" && !isEmpty(obj.current) && !isEmpty(obj.operator) && !isEmpty(obj.input)) {
        obj.tempOperator = value
        obj.state = "operate"
        return
    }
    
}

function updateVal(obj) {

    if (!isEmpty(obj.tempOperator)) {
        obj.current = obj.result
        obj.operator = obj.tempOperator
        obj.input = null
        delete obj.tempOperator
        delete obj.result
        obj.state = "secondInput"
        return
    }

    if (isEmpty(obj.tempOperator)) {
        obj.current = null
        obj.operator = null
        obj.input = null
        delete obj.tempOperator
        delete obj.result
        obj.state = "firstInput"
        return
    }
}




numbpad.addEventListener("click", (event) => {
    let target = event.target
    let button = target.classList.value
    let value = target.textContent

    specialInput(button)

    if (objMath.state === "firstInput") {
        getFirstInput(button, value, objMath)
        console.log(objMath)
    }

    if (objMath.state === "secondInput") {
        getSecondInput(button, value, objMath)
        console.log(objMath)
    }

    if (objMath.state === "operate") {
        operate(objMath)
        
    }

    return update(objMath.state)

})

function rounded(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000
}

function update(state) {
    if (state === "firstInput") return num.textContent = objMath.input
    if (state === "secondInput") return num.textContent = `${objMath.current} ${objMath.operator} ${objMath.input ?? ""}`
    if (state == "operate" && objMath.result === Infinity) return num.textContent = "Error"
    if (state == "operate") {
        num.textContent = objMath.result
        updateVal(objMath)
        return
    }
    
}

function specialInput(button) {
    let readyToOperate = !isEmpty(objMath.current) && !isEmpty(objMath.input) && !isEmpty(objMath.operator)
    // Handle clear button
    if (button === "num-btn clear") {
        objMath.current = null
        objMath.input = null
        objMath.operator = null
        delete objMath.result
        delete objMath.tempOperator
        objMath.state = "firstInput"
    }

    // Handle equal button
    if (button === "operator-btn equal" && readyToOperate) return obj.state = "operate"

    // Handle backspace button
    // if (button === "operator-btn back" && !isEmpty(objMath.input)) 


}

