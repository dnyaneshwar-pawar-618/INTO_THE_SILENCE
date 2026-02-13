/*
let promise = new Promise((resolve, reject) => {
    let success = true

    if (success) {
        resolve("Data received...")
    } else {
        reject("Something went wrong...")
    }
})

promise
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })

*/


//* __________________________________________________________________________

//! User Registration Flow 🧠

/*
function validateUsername(username) {
    return new Promise((resolve, reject) => {
        if (typeof username === "string" && username.length >= 4) {
            resolve(username)
        } else {
            reject("Username must be at least 4 characters")
        }
    })
}

function checkUserExists(username) {
    return new Promise((resolve, reject) => {
        let existingUsers = ['admin', 'will']

        if (existingUsers.includes(username)) {
            reject("Username already taken")
        } else {
            resolve(username)
        }
    })
}

function saveUser(username) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`User '${username}' saved successfully`)
        }, 2000)
    })
}

validateUsername('will')
    .then(checkUserExists)
    .then(saveUser)
    .then(result => {
        console.log("✅ Success:", result)
    })
    .catch(error => {
        console.log("❌ Error:", error)
    })
*/

//* ----------------------------------------------------------------

const url = 'https://v2.jokeapi.dev/joke/Any'

const fetchData = async () => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log(data)
}

fetchData()