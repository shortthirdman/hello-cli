const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require('yargs');

const options = yargs
 .usage('Usage: -n <name>')
 .option('n', { alias: 'name', describe: 'Your name', type: 'string', demandOption: true })
 .option('s', { alias: 'search', describe: 'Search term', type: 'string' })
 .argv;

const greet = function() {
	const boxenOptions = {
	 padding: 1,
	 margin: 1,
	 borderStyle: 'round',
	 borderColor: 'green',
	 backgroundColor: '#555555'
	};
	const greeting = `Hello, ${chalk.white.bold(options.name)}!`;
	const msgBox = boxen( greeting, boxenOptions );
	console.log(msgBox);
}

const removeDir = function(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
    } else {
      console.log("No files found in the directory.")
    }
  } else {
    console.log("Directory path not found.")
  }
}

const pathToDir = path.join(__dirname, "your-directory")

removeDir(pathToDir);