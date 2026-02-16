// //* Higher Order Functions

// function x() {
//     console.log("Cosmoic Rays...")
// }

// function y(x) {
//     x()
// }

// y(x)

// const radius = [3, 1, 2, 4]

// const area = function(radius) {
//     return Math.PI * radius * radius
// }

// const calculate = function(radius, logic) {
//     const output = []
//     for (let i = 0; i < radius.length; i++) {
//         output.push(logic(radius[i]))
//     }
//     return output
// }

// console.log(radius.map(area))
// console.log(calculate(radius, area))  // this (calculate) is our implementation of map 


// //* map()
// const arr = [5, 1, 3, 2, 6]

// console.log(arr.map((x) => x * 2))

// function binary(x) {
//     return x.toString(2)
// }

// console.log(arr.map(binary))


// console.log("hello")

// console.log(Math.floor(Math.random() * 2))

// text = ['hello', 'hey' ,'sorry' ]
// final_text = text.join(' ')
// console.log(final_text.split(''))
// console.log()


// function 


// closures
function outer() {
    let outerVar = "I'm in the outer scope!"
    function inner() {
        console.log(outerVar)
        outerVar = "Updated"
        console.log(outerVar)
    }
    return inner
}


const closure = outer()
console.log(closure)
closure()


function greet() {
    console.log('Hello, my name is ' + this.name);
}

const person = {
    name: 'Amit',
    sayHello: greet
};

const anotherPerson = {
    name: 'Jatin'
};

greet();
person.sayHello();
greet.call(anotherPerson);

console.log(this)