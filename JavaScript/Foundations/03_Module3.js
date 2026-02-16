//! 1. Promises
//* A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It can be in one of three states: pending, fulfilled, or rejected.

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve('Data fetched successfully!')
            } else {
                reject("Failed to fetch data.");
            }
        }, 2000)
    })
}
//* Use .then() to handle fulfilled promises and .catch() for rejected ones.

fetchData()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    })



//! ******************************************************************* 


//! 2. Async/Await
//* Async/Await is syntactic sugar built on top of promises, making it easier to write and read asynchronous code. An async function always returns a promise, and within it, you can use the await keyword to pause execution until the promise resolves.

async function fetchDataAsync() {
    try {
        const result = await fetchData(); // Wait for the promise to resolve
        console.log(result); // Output: Data fetched successfully!
    } catch (error) {
        console.error(error); // Handle any errors
    }
}

// Call the async function
fetchDataAsync();



//! ******************************************************************* 

//! 3. Event Loop
//* The Event Loop is a mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded. It continuously checks the call stack and the message queue to execute tasks.

console.log("Start");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

setTimeout(() => {
    console.log("Timeout 2");
}, 100);

console.log("End");

/* Output:
Start
End
Timeout 1
Timeout 2
*/


//! ******************************************************************* 


//! 4. Error Handling in Asynchronous Code
//* Proper error handling is crucial in asynchronous programming to manage failures gracefully. Both promises and async/await provide mechanisms to handle errors effectively.

async function fetchDataWithError() {
    try {
        const result = await fetchData(); // Simulating a successful fetch
        console.log(result);
    } catch (error) {
        console.error("Error:", error); // Handle the error gracefully
    }
}

// Simulating a failure in the promise
function fetchDataWithFailure() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Failed to fetch data due to server error."); // Rejecting the promise
        }, 2000);
    });
}

async function fetchDataWithFailureHandler() {
    try {
        const result = await fetchDataWithFailure(); // This will fail
        console.log(result);
    } catch (error) {
        console.error("Error:", error); // Handling the error
    }
}

// Call the async function
// fetchDataWithFailureHandler();


//! **************************(_ Complex Examples _)**************************


//* Promises

function fetchUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: 1, name: "John Doe"};
            resolve(user);
        }, 1000);
    })
}

function fetchPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            const posts = [
                {id: 1, title: 'post 1', userId},
                {id: 2, title: 'post 2', userId}
            ];
            resolve(posts)
        },1500)
    })
}

//! Promise.all takes an array of promises and returns a single promise that resolves when all the promises in the array have resolved or rejects if any promise rejects.

Promise.all([fetchUser(), fetchPosts(1)]) 
.then(([user, posts]) => {
    console.log('user: ', user);
    console.log('posts:', posts);
})
.catch(error => {
    console.log('Error fetching data', error);
})


//* Async/Await: 

async function fetchUserAndPosts() {
    try {
        const user = await fetchUser();
        const posts = await fetchPosts(user.id);
    } catch (error) {
        console.log('Error: ', error);
    }
}

fetchUserAndPosts();



//* Event Loop: 

console.log("Start"); // 1

setTimeout(() => {
    console.log("Timeout 1"); // 4
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1"); // 3
    })
    .then(() => {
        console.log("Promise 2"); // 5
    });

setTimeout(() => {
    console.log("Timeout 2"); // 6
}, 100);

console.log("End"); // 2



// 6. Working with Fetch API
// Making HTTP Requests Using the Fetch API
// The Fetch API is a modern interface for making HTTP requests.

async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok) {
            throw new Error("Network reponse was not ok");
        }

        const data = await response.json();
        console.log('Fetching User Data From API')
        data.map((user, index) => {
            console.log(index, data[index].website);
        })
    } catch (e) {
        console.log("Fetch error", e)
    }
}

fetchUserData();



const user = { name: 'Alice', age: 25 };
console.table(user); // Displays user data in a table format
console.warn('Name should be in capital')