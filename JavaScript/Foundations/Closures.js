// basic ex
// function createGreeter(greeting) {
//     // this is the closures
//     return function(name) {
//         console.log(`${greeting}, ${name}!`)
//     }
// }

// let sayHello = createGreeter("Hello")
// let sayHi = createGreeter("Hi")

// console.log(sayHello)
// sayHello("_mobi")
// sayHi('_chunu')



// data privacy / encapsulation

// function createCounter() {
//     let count = 0

//     return {
//         increment: function() {
//             count++
//             return count
//         },

//         decrement: function() {
//             count--
//             return count
//         },

//         getCount: function() {
//             return count
//         }
//     }
// }

// let counter = createCounter()
// console.log(counter.increment())
// console.log(counter.increment())

// console.log(counter.decrement())

// console.log(counter.getCount())


// for (let i = 1; i <= 3; i++) {
//   setTimeout(function() {
//     console.log(i); // Prints 1, 2, 3
//   }, i * 1000);
// }

// (function xyz(x) {
//     console.log("Hello, Cosmos!", x)
// })(5)

let arr = [1, 2, 3, 4, 5, "hi"]
// console.log(arr.splice(2, 1))
// let index = arr.indexOf(5)
// console.log(index)
// console.log(arr.splice(index, 3))

let removeVal = "hi"
const filteredArray = arr.filter(item => item !== removeVal)
console.log(filteredArray)

function createTeam() {
    let players = []

    return {
        addPlayer: function (name) {
            players.push(name)
            console.log(`${name} joined the team`)
        },

        removePlayer: function (name) {
            // const idx = players.indexOf(name);
            // if (idx > -1) {
            //     players.splice(idx, 1)
            //     console.log(`${name} left the team`)
            // }
        },

        listPlayers: function () {
            console.log("Team members: ", players.join(", "))
        }
    }
}

const team = createTeam()
team.addPlayer('chunu')
team.addPlayer('mobi')
team.addPlayer('yumi')

team.listPlayers()



const person = {
  name: "John",
  hobbies: ["reading", "coding"],
  
  printHobbies: () => {
    // 'this' refers to the person object
    this.hobbies.forEach(function(hobby) {
      // 'this' inside here is undefined (or window in non-strict mode)
      console.log(this.name)
      console.log(`${this.name} likes ${hobby}`); // Error!
    });
  }
};

// Fix with arrow function
const person1 = {
  name: "John",
  hobbies: ["reading", "coding"],
  
  printHobbies: function() {
    // Arrow function inherits 'this' from printHobbies
    this.hobbies.forEach(hobby => {
      console.log(`${this.name} likes ${hobby}`); // Works!
    });
  }
};