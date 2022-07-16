//this script complie contracts form contaracts dir and place the output in build folder using solc complier

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildDir = path.resolve(__dirname, 'build');
fs.removeSync(buildDir);

fs.ensureDirSync(buildDir);

const contractDir = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(contractDir, 'utf8');
var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Campaign.sol'
];

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildDir, contract + '.json'),
        output[contract],
    );
}