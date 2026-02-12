// function highlightParagraphs(className) {
//   // Select all <p> elements with the given class
//   const paragraphs = document.querySelectorAll(`p.${className}`);

//   // Loop through each paragraph and apply styles
//   paragraphs.forEach(paragraph => {
//     paragraph.style.backgroundColor = "yellow";
//     paragraph.style.color = "red";
//   });
// }


// highlightParagraphs('important')

/*
// Q2. Filter and Square
let arr = [2, 15, 8, 20, 5]

const solution = arr.filter((x) => x > 10).map((y) => y * y)
console.log(solution)


const obj1 = { name: "Alice", age: 25 };
const obj2 = { age: 30, city: "New York" };

function mergeObjects(obj1, obj2) {
    // console.log(obj1.name + " " + obj1.age)
    return {...obj1, ...obj2}
}

console.log(mergeObjects(obj1, obj2));
// Output: { name: "Alice", age: 30, city: "New York" }


const URL1 = `https://jsonplaceholder.typicode.com/users/`

const fetchUserData = async (userId) => {
  try {
    if (userId === null || userId === "" || isNaN(userId)) {
      throw new Error("Invalid user ID. Please enter a number between 1 and 10.");
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }

    const user = await response.json();
    console.log(`Name: ${user.name}\nEmail: ${user.email}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Example usage:
fetchUserData(1); // Call with a valid user ID


*/

// async function fetchData() {
//     let response = await fetch(URL1) 
//     let data = await response.json()
//     console.log(data)
//     data.forEach(user => {
//         console.log(user.email)
//     });
// }

// fetchData()


// const products = [
//   { name: "Laptop", price: 999 },
//   { name: "Phone", price: 699 },
//   { name: "Tablet", price: 499 }
// ];

// function calculateTotalPrice(products) {
//     return products.reduce((total, product) => total + product.price, 0)
// }

// console.log(calculateTotalPrice(products)); // Output: 2197




//! Promises and Async/Await
/*
async function fetchMultipleUsers(userIds) {
    try {
        const fetchPromises = userIds.map(userId => 
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch user ${userId}`)
                    }
                    return response.json()
                })
        );

        const users = await Promise.all(fetchPromises);
        return users
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

fetchMultipleUsers([1, 2, 3])
    .then(users => console.log(users))
    .catch(error => console.error(error))
*/

//! DOM and Event Delegation

function setupTodoList() {
    const todoList = document.createElement('ul')
    todoList.id = "todoList";

    ["Todo 1", "Todo 2", "Todo 3"].forEach(text => {
        const li = document.createElement('li')
        li.textContent = text
        todoList.appendChild(li)
    });

    document.body.appendChild(todoList)

    todoList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            console.log('Clicked: ', event.target.textContent)
        }
    })
}