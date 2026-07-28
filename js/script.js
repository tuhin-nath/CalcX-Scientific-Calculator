
// ==========================
// ELEMENTS
// ==========================

const currentValue = document.getElementById("current-value");
const previousValue = document.getElementById("previous-value");
const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("theme-toggle");

let expression = "";
let history = [];


function updateDisplay() {
    currentValue.textContent = expression || "0";
}

function insertValue(value) {
    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    previousValue.textContent = "";
    updateDisplay();
}

function deleteNumber() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {

    if (expression.trim() === "") return;

    try {

        let exp = expression
            .replace(/÷/g, "/")
            .replace(/×/g, "*");

        let result = Function('"use strict"; return (' + exp + ')')();

        previousValue.textContent = expression + " =";

        currentValue.textContent = result;

        history.push(expression + " = " + result);

        updateHistory();

        expression = result.toString();

    } catch {

        currentValue.textContent = "Error";

        expression = "";

    }

}


function scientificFunction(func) {

    if (expression === "") return;

    try {

        let value = Number(expression);

        let result;

        switch (func) {

            case "sin":
                result = Math.sin(value * Math.PI / 180);
                break;

            case "cos":
                result = Math.cos(value * Math.PI / 180);
                break;

            case "tan":
                result = Math.tan(value * Math.PI / 180);
                break;

            case "sqrt":
                result = Math.sqrt(value);
                break;

            case "log":
                result = Math.log10(value);
                break;

            case "ln":
                result = Math.log(value);
                break;

            default:
                return;

        }

        previousValue.textContent = func + "(" + value + ")";

        currentValue.textContent = result;

        history.push(func + "(" + value + ") = " + result);

        updateHistory();

        expression = result.toString();

    } catch {

        currentValue.textContent = "Error";

        expression = "";

    }

}


function updateHistory() {

    historyList.innerHTML = "";

    history.slice().reverse().forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}

function clearHistory() {

    history = [];

    updateHistory();

}

// ==========================
// THEME
// ==========================

function loadTheme() {
    const savedTheme = localStorage.getItem("calcx-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        themeToggle.innerHTML =
            '<span class="material-symbols-rounded">light_mode</span>';
    }
}

function toggleTheme() {

    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem(
        "calcx-theme",
        isLight ? "light" : "dark"
    );

    themeToggle.innerHTML = isLight
        ? '<span class="material-symbols-rounded">light_mode</span>'
        : '<span class="material-symbols-rounded">dark_mode</span>';
}

themeToggle.addEventListener("click", toggleTheme);

// ==========================
// KEYBOARD SUPPORT
// ==========================

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (!isNaN(key) || "+-*/.%()".includes(key)) {
        insertValue(key);
    }

    if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    if (key === "Backspace") {
        deleteNumber();
    }

    if (key === "Escape") {
        clearDisplay();
    }

});

// ==========================
// INITIALIZE
// ==========================

loadTheme();
updateDisplay();
updateHistory();


