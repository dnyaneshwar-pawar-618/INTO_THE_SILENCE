const http = require('http')
const fs = require('fs')

//! Important Properties of req

//* req.url - It gives the requested path.

// http://localhost:3000/about
// console.log(req.url);
// /about

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.end('Home Page')
//     } else if (req.url === "/about") {
//         res.end("About Page");
//     } else if (req.url === '/profile') {
//         res.end("Profile Page")
//     } else {
//         res.end("404 Not Found");
//     }
// });

const { url } = require('url')

//* req.headers
const server = http.createServer((req, res) => {
   console.log(req.headers.host)
   res.end('home')
})  

server.listen(3000, () => console.log("Server started!"))