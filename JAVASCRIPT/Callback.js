// //! Callback Function
// function Show(num, result) {
//     console.log(`The factorial of ${num} is: ${result}`)
// }

// function Factorial(num, callback) {
//     let fact = 1
//     for(let i = 1; i<=num; i++) {
//         fact *= i
//     }
//     setTimeout(() => {
//         callback(num, fact)
//     }, 2000);
// }   

// Factorial(5, Show)




//* ______________________________________________________________________




//! Payment Processing System

/*
function processPayment(balance, amount, onSuccess, OnFailure) {
    console.log("Processing payment...")

    if(balance >= amount) {
        onSuccess(amount, balance - amount)
    } else {
        OnFailure(amount, balance)
    }
}

function paymentSuccess(amount, remainingBalance) {
    console.log(`Payment of $${amount} successful.`)
    console.log(`Remaining balance: $${remainingBalance}`)
}

function paymentFailure(amount, balance) {
    console.log(`Payment of $${amount} failed.`)
    console.log(`Available balance: $${balance}`)
}

processPayment(100, 40, paymentSuccess, paymentFailure)
processPayment(30, 40, paymentSuccess, paymentFailure)

processPayment(30, 40,
    (amt, remaining) => console.log("✔️ Done"),
    () => console.log("❌ Try again later")
)
*/




//* _________________________________________________________________________




//! Data Pipeline with Validation, Transformation, and Error Handling 🧠

/*
function processData(input, onSuccess, onError) {

    validate(input, function (validatedData) {

        transform(validatedData, function (finalData) {

            onSuccess(finalData)

        }, onError)

    }, onError)
}

function validate(data, success, error) {
    if (typeof data !== "string" || data.trim() === "") {
        error("Invalid data: must be a non-empty string")
    } else {
        success(data.trim())
    }
}

function transform(data, success, error) {
    if (data.length < 5) {
        error("Data too short after validation")
    } else {
        success(data.toUpperCase())
    }
}

function onSuccess(result) {
    console.log("✅ Final result:", result)
}

function onError(message) {
    console.log("❌ Error:", message)
}

// Try different inputs
processData("   hello world   ", onSuccess, onError)
processData("   hi   ", onSuccess, onError)
processData(42, onSuccess, onError)
*/




//* ___________________________________________________________________________



/*
const myNumbers = [4, 1, -20, -7, 5, 9, -6];

// let result = myNumbers.filter((x) => x > 0)
// console.log(result)

const posNum = removeNeg(myNumbers, (x) => x > 0)

function removeNeg(numbers, callback) {
    const result = []
    for(let x of numbers) {
        if (callback(x)) {
            result.push(x)
        }
    }

    return result
}

for(let num of posNum) {
    console.log(num)
}
console.log("***********************")
for(let i in posNum) {
    console.log(posNum[i])
}
*/



//* ___________________________________________________________________________