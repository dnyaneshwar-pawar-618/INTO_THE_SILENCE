/*
1. Higher-Order Functions
A Higher-Order Function is a function that does one or both of the following:

Takes one or more functions as arguments.
Returns a function as its result.
*/

const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 40 }
];

// Higher-Order Function: filterPeople
function filterPeople(people, filterFn) {
    const result = [];
    for (let person of people) {
        if (filterFn(person)) {
            result.push(person);
        }
    }
    return result;
}

// Custom filter functions
const isOlderThan30 = person => person.age > 30;
const nameLengthGreaterThan4 = person => person.name.length > 4;

// Use the higher-order function with different filters
const peopleOlderThan30 = filterPeople(people, isOlderThan30);
console.log(peopleOlderThan30);
// Output: [ { name: 'Charlie', age: 35 }, { name: 'David', age: 40 } ]

const peopleWithLongNames = filterPeople(people, nameLengthGreaterThan4);
console.log(peopleWithLongNames);
// Output: [ { name: 'Charlie', age: 35 }, { name: 'David', age: 40 } ]

// ***************************************************************** //
/*
2. Callback Functions
A Callback Function is a function passed into another function as an argument and is executed after some operation is completed.
*/

// Simulate fetching data from a database (asynchronous operation)
function fetchData(callback) {
    setTimeout(() => {
        console.log("Data fetched from the database");
        const userData = { id: 1, name: "Alice", age: 25 };
        callback(userData); // Passing data to the callback function
    }, 2000);  // Simulating a delay of 2 seconds
}

// Callback function to process the fetched data
function processUserData(data) {
    console.log(`Processing user: ${data.name}, Age: ${data.age}`);
}

// Calling fetchData and passing processUserData as a callback
fetchData(processUserData);
// Output:
// Data fetched from the database
// Processing user: Alice, Age: 25

// ***************************************************************** //


/*
3. Closures
A Closure is a function that retains access to variables from its outer scope even after the outer function has returned. This feature allows closures to create private variables.
*/

function createCounter() {
    let count = 0;  // Private variable

    return {
        increment: function () {
            count++;
            console.log(`Counter: ${count}`);
        },
        decrement: function () {
            count--;
            console.log(`Counter: ${count}`);
        },
        getCount: function () {
            return count;
        }
    };
}

const counter = createCounter();
counter.increment();  // Output: Counter: 1
counter.increment();  // Output: Counter: 2
counter.decrement();  // Output: Counter: 1

console.log(counter.getCount());  // Output: 1

// ***************************************************************** //


/*
4. Function Currying
Currying is the process of transforming a function with multiple arguments into a series of nested functions, each taking a single argument. It allows functions to be more flexible and reusable.
*/

// Curry function for discount calculation
function applyDiscount(discount) {
    return function (price) {
        return price - (price * discount);
    };
}

// Creating specific discount functions
const studentDiscount = applyDiscount(0.15);  // 15% discount
const regularDiscount = applyDiscount(0.05);  // 5% discount

// Applying discounts
console.log(studentDiscount(100));  // Output: 85
console.log(regularDiscount(100));  // Output: 95





console.log('***********************')

const promise = new Promise(function (resolve, reject) {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!resolve.ok) {
                reject('Failed to fetch data');
            }
            return response.json();
        })
        .then((data) => {
            resolve('Data Fetched successfully');
            console.log(data);
        })
        .catch((e) => {
            reject(e);
        });
})

promise
    .then((message) => {
        console.log(message);
    })
    .catch((e) => {
        console.error('Error: ', e);
    })



const fetchData = async () => {
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await resp.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}