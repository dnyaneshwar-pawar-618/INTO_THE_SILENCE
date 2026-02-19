//* The OS module in Node.js provides a powerful set of utilities for interacting with the underlying operating system.

/*
? Key Features:

* Retrieve system information (CPU, memory, platform, etc.)
* Access user and network information
* Work with file paths and directories in a cross-platform way
* Monitor system resources and performance
* Handle operating system signals and errors

*/

const os = require('os')

// Basic system information
console.log(`OS Platform: ${os.platform()}`);
console.log(`OS Type: ${os.type()}`);
console.log(`OS Release: ${os.release()}`);
console.log(`CPU Architecture: ${os.arch()}`);
console.log(`Hostname: ${os.hostname()}`);
console.log(`Kernel Version: ${os.version()}`);

// Memory information
const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
console.log(`Memory: ${freeMemGB}GB free of ${totalMemGB}GB`);

// User information
const userInfo = os.userInfo();
console.log(`Current User: ${userInfo.username}`);
console.log(`Home Directory: ${os.homedir()}`);

// Get CPU architecture
console.log(`CPU Architecture: ${os.arch()}`);

console.log(`Home Directory:${os.homedir()}`)
console.log(`Temporary Directory:${os.tmpdir()}`)

// Get CPU information
const cpus = os.cpus();
console.log(`Number of CPU Cores: ${cpus.length}`);

// Display information about each CPU core
cpus.forEach((cpu, index) => {
  console.log(`\nCPU Core ${index + 1}:`);
  console.log(`- Model: ${cpu.model}`);
  console.log(`- Speed: ${cpu.speed} MHz`);
  console.log('- Times (ms):', {     user: cpu.times.user,
    nice: cpu.times.nice,
    sys: cpu.times.sys,
    idle: cpu.times.idle,
    irq: cpu.times.irq
  });
});



//! os.loadavg()
//* Returns an array containing the 1, 5, and 15 minute load averages.
// Get load averages
const loadAverages = os.loadavg();
console.log('System Load Averages (1, 5, 15 min):', loadAverages);


//! os.networkInterfaces()

const networkInterfaces = os.networkInterfaces();

console.log('Network Interfaces:');

// Iterate over each network interface
Object.entries(networkInterfaces).forEach(([name, addresses]) => {
  console.log(`\nInterface: ${name}`);
  addresses.forEach((address) => {
    console.log(`- Family: ${address.family}`);
    console.log(` Address: ${address.address}`);
    console.log(` Netmask: ${address.netmask}`);
    console.log(` MAC: ${address.mac || 'N/A'}`);
    console.log(` Internal: ${address.internal}`);
  });
});


//! os.constants

// Get all signal constants
console.log('Signal Constants:', os.constants.signals);

// Example: Handle common signals
process.on('SIGINT', () => {
  console.log('Received SIGINT. Performing cleanup...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  process.exit(0);
});

console.log('Process is running. Press Ctrl+C to exit.');

