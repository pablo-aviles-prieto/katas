const { execSync } = require('child_process');
const path = require('path');

/*
 ** npm run start /FILE NAME w/o extension/ to generate the js file and execute it
 ** i.e. npm run start multiples-of-3-or-5
 */

// Get the file name from the command line arguments
const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a TypeScript file to run.');
  process.exit(1);
}

// Ensure the tsconfig.json is picked from the root directory
const tscCommand = `tsc --project tsconfig.json`;

// Compile the TypeScript project
execSync(tscCommand, { stdio: 'inherit' });

// Get the base name of the file (without extension)
const baseName = path.basename(fileName, '.ts');

// Construct the full path to the compiled JavaScript file
const jsFilePath = path.join('transpiled', 'katas', `${baseName}.js`);

// Run the compiled JavaScript file
execSync(`node ${jsFilePath}`, { stdio: 'inherit' });
