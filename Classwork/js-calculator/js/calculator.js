 // ==========================================
// 1. UI SELECTORS
// ==========================================
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');

// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS (Students write these)
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
function add(a , b){
    return a + b;
}

// TODO: Write "subtract" callback expression (a, b) => ...
function subtract(a,b){
    return a - b;
}


// TODO: Write "multiply" callback expression (a, b) => ...
function multiply(a,b){
    return a * b;
}


// TODO: Write "divide" callback expression (a, b) => ...
// Rule: Guard against division-by-zero! Return an Error or string warning.
function divide(a,b){
    try {
        return a/b;
    } catch (error) {
        throw new Error ("Can not divide by zero");
    }
}


// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)
function calculator (numA, numB, callback){
    return callback(numA, numB);
    
}

// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
try {
    // alert('click');
    // TODO: Extract values from the inputs and parse them as floats.
    const valueA = parseFloat(num1Input.value);
    const valueB = parseFloat(num2Input.value);

    // TODO: Retrieve the selected operation string value.
    const operation = operationSelect.value;
    if (num1Input.value === "" || num2Input.value === ""){
        throw new Error("Introduce a new number");
    }
    if (operation.value === ""){
        throw new Error ("Selection an operation");
    }
    // TODO: Match the selected operation string to its corresponding function reference.
    let targetCallback;
    switch (operation){
        case "add":
            targetCallback = add;
            break;
        case "substract":
            targetCallback = subtract;
            break;
        case "multiply":
            targetCallback = multiply;
            break;
        case "divide":
            targetCallback = divide;
            break;
    }

    // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
    const ans = calculator(valueA, valueB, targetCallback);

    // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
    resultStatus.className = "alert alert-success text center"
    resultStatus.textContent = `Result: ${ans}`;
    } catch (error) {
        resultStatus.className = "alert alert-danger text center"
        resultStatus.textContent = `Error: ${error.message}`
    }
});