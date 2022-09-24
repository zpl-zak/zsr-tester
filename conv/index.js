const fs = require('fs');
const path = require('path');
const process = require('process');

const questions = []
const inputFile = process.argv[2] || 'input.csv'

fs.readFileSync(path.join(__dirname, inputFile), 'utf8').split('\n').forEach(row => {
    const [name, ...choices] = row.split('|');
    questions.push({
        question: name,
        image: choices[3] || null,
        choices: [
            { text: choices[0], correct: true },
            { text: choices[1], correct: false },
            { text: choices[2], correct: false },
        ]
    })
})
console.log('module.exports = ' + JSON.stringify(questions, null, 4))
