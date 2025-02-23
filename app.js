"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const keys = document.querySelectorAll(".key");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");

    let displayValue = "0";
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = displayValue;
    }

    function handleKeyClick(event) {
        const { value } = event.target.dataset;

        if (!isNaN(value)) {
            handleNumber(value);
        } else {
            handleOperator(value);
        }
        updateDisplay();
    }

    function handleNumber(value) {
        if (waitingForSecondOperand) {
            displayValue = value;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === "0" ? value : displayValue + value;
        }
    }

    function handleOperator(value) {
        if (value === '.') {
            if (!displayValue.includes('.')) {
                displayValue += '.';
            }
            return;
        }

        if (operator && waitingForSecondOperand) {
            operator = value;
            return;
        }

        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
        } else if (operator) {
            const result = calculate(firstOperand, parseFloat(displayValue), operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = value;
    }

    function calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') return firstOperand + secondOperand;
        if (operator === '-') return firstOperand - secondOperand;
        if (operator === '*') return firstOperand * secondOperand;
        if (operator === '/') return firstOperand / secondOperand;

        return secondOperand;
    }

    function clearDisplay() {
        displayValue = "0";
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }

    keys.forEach(key => key.addEventListener("click", handleKeyClick));
    clearButton.addEventListener("click", clearDisplay);
    equalsButton.addEventListener("click", () => {
        if (operator && !waitingForSecondOperand) {
            displayValue = `${parseFloat(calculate(firstOperand, parseFloat(displayValue), operator).toFixed(7))}`;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    });

    updateDisplay();
});
