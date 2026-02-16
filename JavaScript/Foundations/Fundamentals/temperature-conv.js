let deg_cel = 5
let deg_fer = 41

function tempToFer(deg_cel) {
    let deg_fer = deg_cel * 9/5 + 32
    return deg_fer
}

function tempToCel(deg_fer) {
    let def_cel = (deg_fer - 32) * 5/9
    return def_cel
}

console.log(`Temp of ${deg_cel}C in Fer is ${tempToFer(deg_cel)}F`)
console.log(`Temp of ${deg_fer}F in Fer is ${tempToCel(deg_fer)}C`)


//* Type Coercion + Operatos
console.log("5" + 3)
console.log("cosmos" * 2) // NaN
console.log(10  + " saturn")
console.log("10" - "5")

// shopping cart calculator
console.log("************ Shopping Cart Calculator **************")

cart = {
    items : ['mouse', 'pen drive', 'keyboard'],
    cart_price : 2000,
    balance : 2100,
    tax: 75,
}

function processPayment(cart) {
    // console.log(cart.items.length)
    if (cart.items.length === 0) {
        console.log("Cart is empty. Add at least one item to proceed.")
    }

    if (cart.cart_price > cart.balance) {
        console.log("Insufficient Balance")
    } else {
        let total_amount = cart.cart_price + cart.tax
        console.log("total amount is : ", total_amount)
        console.log("available balance", cart.balance - total_amount)
    }
}

processPayment(cart)