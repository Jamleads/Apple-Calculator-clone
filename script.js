'use strict';

const calculator = document.querySelector('.calculator');
const key = document.querySelector('.cal-keys');
const display = document.querySelector('.cal-display');
const clearBtn = document.querySelector('.clear');

key.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNum = display.textContent;

    if (!action) {
      if (displayNum === '0') {
        display.textContent = keyContent;
        clearBtn.innerHTML = 'C';
      } else {
        display.textContent = displayNum + keyContent;
        clearBtn.innerHTML = 'C';
      }
    }

    if (
      action === 'divide' ||
      action === 'multiply' ||
      action === 'subtract' ||
      action === 'add'
    ) {
      key.classList.add('pressed');
      calculator.dataset.firstValue = displayNum;
      calculator.dataset.operator = action;
    }

    if (action === 'clear') {
      display.textContent = '0';
      clearBtn.innerHTML = 'AC';
    }

    if (action === 'plusmin') {
      if (!displayNum.includes('-')) {
        display.textContent = '-' + displayNum;
      }
    }

    if (action === 'pacentage') {
      display.textContent = displayNum / 100;
    }

    if (action === 'decimal') {
      if (!displayNum.includes('.')) {
        display.textContent = displayNum + '.';
      }
    }

    const operatorKeys = document.querySelectorAll(
      '[data-action="divide"], [data-action="multiply"], [data-action="subtract"], [data-action="add"]'
    );
    const operatorKeyPressed = Array.from(operatorKeys).some(key =>
      key.classList.contains('pressed')
    );

    if (operatorKeyPressed && !action) {
      display.textContent = keyContent;
      operatorKeys.forEach(key => key.classList.remove('pressed'));
    }

    if (operatorKeyPressed && action === 'decimal') {
      display.textContent = '0.';
    }

    if (displayNum === '0.' && !action) {
      display.textContent = displayNum + keyContent;
    }

    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNum;

      const calculate = function (firstValue, operator, secondValue) {
        let result = '';

        if (operator === 'divide') {
          result = parseFloat(firstValue) / parseFloat(secondValue);
        } else if (operator === 'multiply') {
          result = parseFloat(firstValue) * parseFloat(secondValue);
        } else if (operator === 'subtract') {
          result = parseFloat(firstValue) - parseFloat(secondValue);
        } else if (operator === 'add') {
          result = parseFloat(firstValue) + parseFloat(secondValue);
        }

        return result;
      };

      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
});

// function adjustFontSize() {
//   const outputWidth = display.clientWidth;
//   const textWidth = display.scrollWidth;

//   if (textWidth > outputWidth) {
//     const fontSize = parseInt(getComputedStyle(display.fontSize));
//     const newFontSize = (outputWidth / textWidth) * fontSize;
//     display.style.fontSize = '${newFontSize}px';
//   } else {
//     display.style.fontSize = '3rem';
//   }
// }
// window.addEventListener('resize', adjustFontSize);
