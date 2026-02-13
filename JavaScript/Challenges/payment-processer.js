
/* 
Problem 2: Chained Payment Processor (Medium)
Scenario: You're implementing a payment system with multiple verification steps.

Task: Create a promise chain that processes an order through these steps:

validateCart (1 second) - Check if items are in stock. Resolve with cart total, reject if empty/out of stock

processPayment (1.5 seconds) - Take cart total, deduct from user balance. Resolve with transaction ID, reject if insufficient funds

sendConfirmationEmail (1 second) - Send email receipt. Resolve with "Email sent to user@example.com"
*/


const order = {
    items: ["laptop", "mouse"],
    total: 1800,
    userBalance: 1500,
    email: "user@example.com"
};


// ste1: validate cart
function validateCart(order) {
    return new Promise((resolve, reject) => {
        console.log('Validating cart...')

        setTimeout(() => {
            if (!order.items || order.items.length === 0) {
                reject(new Error('Cart is Empty.'))
            } else if (order.total <= 0) {
                reject(new Error('Invalid cart total'))
            } else {
                console.log(`Cart validate: ${order.items.length} items, total: $${order.total}`)
                resolve(order.total)
            }
        }, 1000);
    })
}

// step 2: process payment
function processPayment(amount) {
    return new Promise((resolve, reject) => {
        console.log('Processing payment...')

        setTimeout(() => {
            if (amount > order.userBalance) {
                reject(new Error(`Insufficient Balance: ${order.userBalance}, Required: $${amount}`))
            } else {
                const transactionId = "TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase();
                order.userBalance -= amount
                console.log(`Payment processes: $${amount}, Transcation ID: ${transactionId}`)
                resolve({ transactionId, amount })
            }
        }, 1500)
    })
}

// step 3: send confirmtion email
function sendConfirmationEmail(paymentDetails) {
    return new Promise((resolve) => {
        console.log('Sending confirmation email...')

        setTimeout(() => {
            const message = `Email sent to ${order.email} - Transaction ${paymentDetails.transactionId} for $${paymentDetails.amount}`;
            console.log(`✅ ${message}`);
            resolve(message);
        }, 1000);
    })
}

// Execute the payment chain
function processOrder() {
    console.log('Starting order processing...')

    validateCart(order)
        .then(amount => processPayment(amount))
        .then(paymentDetails => sendConfirmationEmail(paymentDetails))
        .then(result => {
            console.log("\n🎉 Order completed successfully!");
            console.log(`   ${result}`);
            console.log(`   Remaining balance: $${order.userBalance}`);
        })
        .catch(error => {
            console.log(`\n${error.message}`);
            console.log("Step failed - order cancelled");
        })
        .finally(() => {
            console.log("\n🏁 Payment process completed");
        });
}
    

