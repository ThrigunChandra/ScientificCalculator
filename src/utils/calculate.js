// Key values
const operators = {
    "+": { precedence: 1, associativity: "L", fn: (a, b) => a + b },
    "-": { precedence: 1, associativity: "L", fn: (a, b) => a - b },
    "*": { precedence: 2, associativity: "L", fn: (a, b) => a * b },
    "/": { precedence: 2, associativity: "L", fn: (a, b) => (b === 0 ? "Cannot divide by zero!" : a / b) },
    "^": { precedence: 3, associativity: "R", fn: (a, b) => Math.pow(a, b) },
};
const functions = {
    "sin": (a) => Math.sin(a * Math.PI / 180),
    "cos": (a) => Math.cos(a * Math.PI / 180),
    "tan": (a) => Math.tan(a * Math.PI / 180),
    "ln": (a) => (a <= 0 ? "Undefined result!" : Math.log(a)),
    "log": (a) => (a <= 0 ? "Undefined result!" : Math.log10(a)),
    "√": (a) => (a < 0 ? "Undefined result!" : Math.sqrt(a)),
};
const constants = {
    "π": Math.PI,
    "e": Math.E
};

// Conversion from infix to postfix for evaluation 
const infixToPostfix = (tokens) => {
    let output = [];
    let stack = [];

    tokens.forEach(token => {
        if (!isNaN(token) || constants[token]) {
            output.push(token in constants ? constants[token] : parseFloat(token));
        } else if (token in functions) {
            stack.push(token);
        } else if (token in operators) {
            while (
                stack.length &&
                operators[stack[stack.length - 1]] &&
                ((operators[token].associativity === "L" && operators[token].precedence <= operators[stack[stack.length - 1]].precedence) ||
                 (operators[token].associativity === "R" && operators[token].precedence < operators[stack[stack.length - 1]].precedence))
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        } else if (token === "(") {
            stack.push(token);
        } else if (token === ")") {
            while (stack.length && stack[stack.length - 1] !== "(") {
                output.push(stack.pop());
            }
            stack.pop();
            if (stack.length && functions[stack[stack.length - 1]]) {
                output.push(stack.pop());
            }
        }
    });
    while (stack.length) {
        output.push(stack.pop());
    }
    return output;
};

// Evaluate the postfix expression
const evaluatePostfix = (postfix) => {
    let stack = [];
    for (let token of postfix) {
        if (!isNaN(token)) {
            stack.push(token);
        } else if (token in operators) {
            if (stack.length < 2) return "Invalid expression!";
            let b = stack.pop();
            let a = stack.pop();
            let result = operators[token].fn(a, b);
            if (typeof result === "string") return result;
            stack.push(result);
        } else if (token in functions) {
            if (stack.length < 1) return "Invalid expression!";
            let a = stack.pop();
            let result = functions[token](a);
            if (typeof result === "string") return result; 
            stack.push(result);
        } else {
            return "Invalid expression!";
        }
    }
    return stack.length === 1 ? stack[0] : "Invalid expression!";
};

// Tokenizer to process input
const tokenize = (expression) => {
    return expression.match(/(\d+\.\d+|\d+|π|e|sin|cos|tan|ln|log|√|\+|\-|\*|\/|\^|\(|\))/g);
};

// Main function to calculate result
export const calcResult = (expression) => {
    try {
        let tokens = tokenize(expression);
        if (!tokens) return "Invalid expression!";
        let postfix = infixToPostfix(tokens);
        return evaluatePostfix(postfix);
    } catch (error) {
        return "Error!";
    }
};