const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
// remoteSync looks at the path and deletes everything inside it for each compile
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
console.log('This is campaignPath: ',campaignPath);
const source = fs.readFile(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// ensureDirSync checks if folder exists and creates if not there
fs.ensureDirSync(buildPath);

console.log('This is output: ', output);
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}

console.log('This is source: ', source)
