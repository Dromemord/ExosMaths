class MultiplicationTables extends Exercise {
    constructor(questions = null) {
        // Call the constructor of the parent class
        super('multiplicationTables', ["De tête, résous les multiplications suivantes :"], 1, '', questions);
    }

    // Implement makeQuestions specific to MultiplicationTables
    makeQuestions(nbExos = 10, tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        let questions = [];
    
        const usedPairs = new Set();
        let vEx1, vEx2;
        for (let i = 0; i < nbExos; i++) {
            let pairKey;
            do {
                vEx1 = tables[Math.floor(Math.random() * tables.length)];
                vEx2 = tables[Math.floor(Math.random() * tables.length)];
                pairKey = `${vEx1},${vEx2}`;
            } while (usedPairs.has(pairKey) || usedPairs.has(`${vEx2},${vEx1}`));
            usedPairs.add(pairKey);
            questions.push([vEx1, vEx2]);
        }
    
        return questions;
    }

    // Implement generateQuestionInstructions specific to MultiplicationTables
    generateQuestionInstructions(questions) {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push([`${question[0]} x ${question[1]} = `]);
        });

        return questionInstructions;
    }

    // Implement generateQuestionResults specific to MultiplicationTables
    generateQuestionResults(questions) {
        let questionResults = [];

        questions.forEach(question => {
            questionResults.push([question[0] * question[1]]);
        });
        return questionResults;
    }

    // Implement makeExample specific to MultiplicationTables
    makeExample() {
        return [];
    }

    // Implement formatExample specific to MultiplicationTables
    formatExampleResult() {
        return null;
    }

    // Implement testResultsEquality specific to MultiplicationTables
    testResultsEquality(answer, questionResult) {
        return parseFloat(answer) === questionResult;
    }
}


