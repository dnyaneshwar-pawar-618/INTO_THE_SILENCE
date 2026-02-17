const fs = require("fs")

//* Sync... - this will override the original file
fs.writeFileSync('./test.txt', "Hello, Cosmos...")

//! Async... (async operations always expect a callback (err, result) => {})
// fs.writeFile('./text.txt', "Hello, world...", (err) => { })

//* read file sync...
// const result = fs.readFileSync('./contact.txt', "utf-8")
// console.log(result)

//* read file async...
fs.readFile('./contact.txt', 'utf-8', (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }

})

let writeFileResultSycn = "Universe is 13.4B years old."
fs.appendFileSync('./test.txt', `${writeFileResultSycn}`)


fs.cpSync('./test.txt', './copy.txt')

// fs.unlinkSync('./text.txt') // to delete files

console.log(fs.statSync('./test.txt'))