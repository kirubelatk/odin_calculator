function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mul(x, y) {
    return x * y;
}

function div(x, y) {
    return (x / y).toFixed(2);
}

function operate(x, y, operator) {
    switch(operator) {
        case '+':
            return add(x, y);
        case '-':
            return sub(x, y);
        case '*':
            return mul(x, y);
        case '/':
            return div(x, y);
        default:
            return 0;
    }
}

const dis = document.querySelector(".dis");
const buttons = document.querySelectorAll("button");

let inputArray = [];

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.value;

        if (!isNaN(value) || value === '.') {
            // Number or decimal point is clicked
            inputArray.push(value);
        } else if (value === "+" || value === "-" || value === "*" || value === "/") {
            // Operator is clicked
            if (inputArray.length > 0) {
                inputArray.push(value);
            }
        } else if (value === "C") {
            // Clear is clicked
            inputArray = [];
            dis.textContent = '';
        } else if (value === "=") {
            // Equals is clicked
            let result = evaluateExpression(inputArray.join(''));
            dis.textContent = result;
            inputArray = [result];
            return;
        }
        dis.textContent = inputArray.join(' ');
    });
});

function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    let tokens = [];
    let num = '';

    // Split expression into tokens
    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if (!isNaN(char) || char === '.') {
            num += char;
        } else if (operators.includes(char)) {
            if (num !== '') {
                tokens.push(parseFloat(num));
                num = '';
            }
            tokens.push(char);
        }
    }
    if (num !== '') {
        tokens.push(parseFloat(num));
    }

    // Evaluate multiplication and division first
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const operator = tokens[i];
            const left = tokens[i - 1];
            const right = tokens[i + 1];
            const result = operate(left, right, operator);
            tokens.splice(i - 1, 3, result);
            i--; // Move back to reevaluate the current position
        } else {
            i++;
        }
    }

    // Evaluate addition and subtraction
    i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '+' || tokens[i] === '-') {
            const operator = tokens[i];
            const left = tokens[i - 1];
            const right = tokens[i + 1];
            const result = operate(left, right, operator);
            tokens.splice(i - 1, 3, result);
            i--; // Move back to reevaluate the current position
        } else {
            i++;
        }
    }

    return tokens[0];
}
