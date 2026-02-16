// document.addEventListener('DOMContentLoaded', function() {
// const result = document.getElementById('result');
// const buttons = document.querySelectorAll('.btn');

//     // Add click event listeners to all buttons
//     buttons.forEach(button => {
//         button.addEventListener('click', function() {
//             const buttonText = button.textContent;

//             if (buttonText === 'AC') {
//                 result.value = '';
//             } else if (buttonText === 'DEL') {
//                 result.value = result.value.slice(0, -1);
//             } else if (buttonText === '=') {
//                 try {
//                     result.value = eval(result.value);
//                 } catch (error) {
//                     result.value = 'Error';
//                 }
//             } else {
//                 result.value += buttonText;
//             }
//         });
//     });
// });




// const result = document.getElementById('result');
// const buttons = document.querySelectorAll('.btn');

// buttons.forEach(btn =>{
//     btn.addEventListener('click', ()=>{
//         let btnVal = btn.textContent;

//         if(btnVal === 'AC'){
//             result.value = '';
//         } else if(btnVal == 'DEL'){
//             result.value = result.value.slice(0,-1);
//         } else if(btnVal == '='){
//             try{
//                 result.value = eval(result.value);
//             } catch(error){
//                 result.value = 'Error';
//             }
//         } else{
//             result.value += btnVal;
//         }
//     })
// })


/*
document.addEventListener('DOMContentLoaded', function() {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');

    // Add click event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleInput(button.textContent);
        });
    });

    // Add keydown event listener to handle keyboard input
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (isNumericKey(key) || isOperatorKey(key) || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
            event.preventDefault();
            handleInput(key);
        }
    });

    function handleInput(input) {
        if (input === 'AC' || input === 'Escape') {
            result.value = '';
        } else if (input === 'DEL' || input === 'Backspace') {
            result.value = result.value.slice(0, -1);
        } else if (input === '=' || input === 'Enter') {
            try {
                result.value = eval(result.value);
            } catch (error) {
                result.value = 'Error';
            }
        } else if (isNumericKey(input) || isOperatorKey(input) || input === '.') {
            result.value += input;
        }
    }

    //  /\d/: This is a regular expression (regex) pattern. In regex, \d matches any digit (equivalent to [0-9]).
    // `.test(key): This is a method provided by JavaScript's RegExp object. It tests whether the provided key string matches the regex pattern.
    function isNumericKey(key) {
        return /\d/.test(key);  // The function returns true if the key matches the regex pattern 
    }


    // `.includes(key): This is a method provided by JavaScript's Array object. It checks whether the array includes the provided key value.
    function isOperatorKey(key) {
        return ['+', '-', '*', '/', '%'].includes(key);
    }
});
*/









// Expense Tracker code 

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

function addTransaction(e) {
    // preventDefault() is a method in JavaScript that can be used to prevent the default action associated with an event from occurring. 
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();

        text.value = '';
        amount.value = '';

    }
}

function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement(li);

        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button> `

    list.appendChild(item);
}

/* 
Salary: +1000
Rent: -500
Groceries: -150
Freelance Project: +300
*/
function updateValues() {
    const amounts = transactions.map(transactions => transactions.amount);
    // amounts = [1000, -500, -150, 300]

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // total = (1000 + (-500) + (-150) + 300).toFixed(2)
    // total = 650.00

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    // income = [1000, 300].reduce((acc, item) => (acc += item), 0).toFixed(2)
    // income = (1000 + 300).toFixed(2)
    // income = 1300.00

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    // expense = [-500, -150].reduce((acc, item) => (acc += item), 0) * -1.toFixed(2)
    // expense = (-500 + (-150)) * -1.toFixed(2)
    // expense = -650 * -1.toFixed(2)
    // expense = 650.00

    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
}

function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);