//! w3schools 

//* Note: Always handle errors when working with file operations to prevent your application from crashing.

// const fs = require('fs')
// console.log(fs)

// fs.writeFile('./text.txt', 'This is my first text file.', (err) => {})

// fs.readFile('./text.txt', 'utf-8', (err, result) => {
//     if (err) {
//       console.error('Error reading file: ', err) 
//       return 
//     }
//     console.log('File content:\n',result)
// })


// Reading Files with Promises (Modern Approach)
// const fs = require('fs').promises
// // console.log(fs)

// async function readFileExample() {
//     try {
//         const data = await fs.readFile('text.txt', 'utf-8')
//         console.log('File content:', data);
//     } catch (err) {
//          console.error('Error reading file:', err);
//     }
// }

// readFileExample()



// Best Practice: Always specify the character encoding (like 'utf8') when reading text files to get a string instead of a Buffer.
// Example: Reading a file synchronously
// const fs = require('fs');

// try {
//   // Read file synchronously
//   const data = fs.readFileSync('_chunu.txt', 'utf8');
//   console.log('File content:', data);
// } catch (err) {
//   console.error('Error reading file:', err);
// }


// const fs = require('fs').promises

// async function writeFileExample() {
//     try {
//         await fs.writeFile('_yumi.txt', 'Hello, Cosmos!!', 'utf-8')
//         console.log('Files created successfully');
//   } catch (err) {
//     console.error('Error writing files:', err);
//   }
// }

// writeFileExample()

// const fs = require('fs')

// async function appendToFile() {
//     try {
//         const logEntry = `Hello from Gyanesh after 13.8 Billion Years.`
//         await fs.appendFile('_yumi.txt', logEntry, 'utf8')
//         console.log('Log entry added')
//     } catch (err) {
//         console.error('Error appending to file', err)
//     }
// }

// appendToFile()

// const result = fs.readFileSync('./_yumi.txt', 'utf8', (err, result) => {})
// console.log(result)


// 3. Using File Handles
// const fs = require('fs').promises;

// async function writeFileWithHandle() {
//     let fileHandle;
    
//     try {
//         fileHandle = await fs.open('output.txt', 'w')
        
//         await fileHandle.write('First line\n')
//         await fileHandle.write('Second line\n')
//         await fileHandle.write('Third line\n')
        
//         console.log('Content written successfully')
//     } catch (err) {
//         console.error('Error writing to file:', err)
//     } finally {
//         if (fileHandle) {
//             await fileHandle.close()
//         }
//     }
// }

// writeFileWithHandle()








// const fs = require("fs")

// //* Sync... - this will override the original file
// fs.writeFileSync('./test.txt', "Hello, Cosmos...")

// //! Async... (async operations always expect a callback (err, result) => {})
// // fs.writeFile('./text.txt', "Hello, world...", (err) => { })

// //* read file sync...
// // const result = fs.readFileSync('./contact.txt', "utf-8")
// // console.log(result)

// //* read file async...
// fs.readFile('./contact.txt', 'utf-8', (err, result) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(result)
//     }

// })

// let writeFileResultSycn = "Universe is 13.4B years old."
// fs.appendFileSync('./test.txt', `${writeFileResultSycn}`)


// fs.cpSync('./test.txt', './copy.txt')

// // fs.unlinkSync('./text.txt') // to delete files

// console.log(fs.statSync('./test.txt'))