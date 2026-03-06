document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operatorSelect = document.getElementById('operator');
    const calcBtn = document.getElementById('calc-btn');
    const resultBox = document.getElementById('result-box');
    
    const errorNum1 = document.getElementById('error-num1');
    const errorNum2 = document.getElementById('error-num2');

    let history = [];

    calcBtn.addEventListener('click', () => {
        resetErrors();

        const val1 = num1Input.value.trim();
        const val2 = num2Input.value.trim();
        const operator = operatorSelect.value;

        let isValid = true;

        if (!isValidNumber(val1)) {
            showError(num1Input, errorNum1, "Пожалуйста, введите корректное число");
            isValid = false;
        }

        if (!isValidNumber(val2)) {
            showError(num2Input, errorNum2, "Пожалуйста, введите корректное число");
            isValid = false;
        }

        if (!isValid) return;

        const n1 = parseFloat(val1);
        const n2 = parseFloat(val2);
        let resultStr = '';

        try {
            const result = calculate(n1, n2, operator);
            resultStr = `${n1} ${operator} ${n2} = ${result}`;
        } catch (e) {
            resultStr = e.message;
        }

        history.push(resultStr);

        if (history.length > 4) {
            history.shift();
        }

        renderResults();
    });

    function isValidNumber(value) {
        if (value === "") return false;
        const numRegex = /^-?\d+([.,]\d+)?$/;
        return numRegex.test(value);
    }

    function calculate(n1, n2, operator) {
        switch (operator) {
            case '+': return n1 + n2;
            case '-': return n1 - n2;
            case '*': return n1 * n2;
            case '/': 
                if (n2 === 0) throw new Error("Деление на ноль!");
                return Math.round((n1 / n2) * 100000) / 100000; 
            default: return 0;
        }
    }

    function showError(inputEl, errorEl, message) {
        inputEl.classList.add('input-error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    function resetErrors() {
        num1Input.classList.remove('input-error');
        num2Input.classList.remove('input-error');
        errorNum1.style.display = 'none';
        errorNum2.style.display = 'none';
    }

    function renderResults() {
        resultBox.innerHTML = '';

        history.forEach((item, index) => {
            const div = document.createElement('div');
            div.textContent = item;
            
            if (index === history.length - 1) {
                div.classList.add('current-item');
            } else {
                div.classList.add('history-item');
            }
            
            resultBox.appendChild(div);
        });
    }

    num1Input.addEventListener('input', resetErrors);
    num2Input.addEventListener('input', resetErrors);
});