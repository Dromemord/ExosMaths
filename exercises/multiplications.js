class Multiplications extends Exercise {
    constructor(questions = null) {
        // Call the constructor of the parent class
        super('multiplications', ["Pose les multiplications suivantes :"], 1, '', questions);
    }

    // Implement makeQuestions specific to MultiplicationTables
    makeQuestions(nbExos = 5, nbDigits1 = 4, nbDigits2 = 3) {
        let questions = [];

        const nbDigits1Base = 10 ** (nbDigits1 - 1);
        const nbDigits2Base = 10 ** (nbDigits2 - 1);

        for (let i = 0; i < nbExos; i++) {
            const vEx1 = getRandomInt(nbDigits1Base, 10 * nbDigits1Base);
            const vEx2 = getRandomInt(nbDigits2Base, 10 * nbDigits2Base);
            questions.push([vEx1, vEx2]);
        }

        return questions
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





