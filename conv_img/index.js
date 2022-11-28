const fs = require('fs');
const path = require('path');
const process = require('process');

const questions = []
const inputFile = process.argv[2] || 'input.csv'

fs.readFileSync(path.join(__dirname, inputFile), 'utf8').split('\n').forEach(row => {
    const [img, name] = row.split('|');
    questions.push({
        image: img,
        name: name,
    })
})
console.log('module.exports = ' + JSON.stringify(questions, null, 4))
