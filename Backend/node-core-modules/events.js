const eventEmitter = require('events')
const { userInfo } = require('os')
//* The EventEmitter class is fundamental to Node.js's event-driven architecture.
//* It provides the ability to create and handle custom events.

// console.log('event emitter', eventEmitter)

// You can assign event handlers to your own events with the EventEmitter object.
// To fire an event, use the emit() method.

const myEmitter = new eventEmitter()

myEmitter.on('greeting', () => {
    console.log('Hello cosmos!!!')
})

myEmitter.emit('greeting')

let myEventHandler = function () {
    console.log('I hear a scream!')
}

//Assign the event handler to an event:
myEmitter.on('scream', myEventHandler)

myEmitter.emit('scream')

//! Common EventEmitter Patterns

//* 1. Passing Arguments to Event Handlers

myEmitter.on('userJoined', (username, userId) => {
    console.log(`${userId}: '${username}' has joined the company.`)
});

myEmitter.emit('userJoined', 'Gyanesh Pawar', '1102557')


//* 2. Handling Events Only Once

// This listener will be called only once
myEmitter.once('connection', () => {
  console.log('First connection established');
});

myEmitter.emit('connection'); // This will trigger the listener
myEmitter.emit('connection'); // This won't trigger the listener again

//* 3. Error Handling

// Always handle 'error' events
myEmitter.on('error', (err) => {
  console.error('An error occurred:', err.message);
});

// This will trigger the error handler
myEmitter.emit('error', new Error('Something went wrong'));