// const path = require('path')

// import path from 'path';

//* path.basename() - returns the last portion of a path

// const filename = path.basename('/users/docs/file.txt')
// console.log(filename)

// const fileNameWithout = path.basename('/users/docs/file.txt', '.txt')
// console.log(fileNameWithout)

//* __direname
// console.log('Directory name: ', __dirname)

//* __filename
// console.log('File name: ', __filename)

//* path.join()
// const configPath = path.join(__dirname, 'config', 'app-config.json');
// console.log('Config file path:', configPath);

// console.log(path.dirname(__filename))

// console.log(path.extname('index.html')) // output: .html

// console.log(path.join('C:/logs', './internal', './public.txt'))

//! Note: path.join() is preferred over string concatenation with + as it handles different path separators across operating systems. 

//! Tip: path.resolve() is commonly used with __dirname to create absolute paths relative to the current module's location.

// const pathInfo = path.parse('/users/docs/file.txt');





const path = require('path');
const fs = require('fs/promises') ;

// Current module's directory and file info
console.log('Module directory:', __dirname);
console.log('Module file path:', __filename);

// Common path patterns
const paths = {
  // Configuration files relative to project root
  config: path.join(__dirname, '..',  'config', 'app.json'),
 
  // Logs directory (create if doesn't exist)
  logs: path.join(__dirname, '..', 'logs'),
 
  // Public assets
  public: path.join(__dirname, '..', 'public'),
 
  // Uploads directory with proper permissions
  uploads: path.join(__dirname, '..', 'uploads')
};

// console.log('path-config: ', paths.config)

// Ensure directories exist
async function ensureDirectories() {
  try {
    await Promise.all([
      fs.mkdir(paths.logs, { recursive: true }),
      fs.mkdir(paths.public, { recursive: true }),
      fs.mkdir(paths.uploads, { recursive: true, mode: 0o755 })
    ]);
    console.log('All directories ready');
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

// Example: Load configuration
async function loadConfig() {
  try {
    const configData = await fs.readFile(paths.config, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error loading config:', error.message);
    return {};
  }
}

// Example: Log to application log
async function logToFile(message) {
  try {
    const logFile = path.join(paths.logs, `${new Date().toISOString().split('T')[0]}.log`);
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    await fs.appendFile(logFile, logMessage, 'utf8');
  } catch (error) {
    console.error('Error writing to log:', error);
  }
}

// Initialize and run examples
(async () => {
  await ensureDirectories();
  const config = await loadConfig();
  console.log('Loaded config:', config);
  await logToFile('Application started');
})();