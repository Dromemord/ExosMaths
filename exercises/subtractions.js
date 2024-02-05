class Subtractions extends Exercise {
    constructor(questions = null) {
        // Call the constructor of the parent class
        super('substractions', ["Effectue les soustractions suivantes :"], 1, '', questions);
    }

    // Implement makeQuestions specific to MultiplicationTables
    makeQuestions(nbExos = 5, nbDigits = 8) {
        let questions = [];

        const nbIntDigits = Math.pow(10, nbDigits - 2);
        const nbFracDigits = Math.pow(10, Math.floor(nbDigits / 2));

        for (let i = 0; i < nbExos; i++) {
            const vEx1 = getRandomInt(10 * nbIntDigits, 100 * nbIntDigits);
            const vEx2 = getRandomInt(nbIntDigits, vEx1 - 1);

            questions.push([new DecimalNumber([vEx1, nbFracDigits]), new DecimalNumber([vEx2, nbFracDigits])]);
        }

        return questions
    }
    // Implement generateQuestionInstructions specific to MultiplicationTables
    generateQuestionInstructions(questions) {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push([`${question[0]} - ${question[1]} = `]);
        });

        return questionInstructions;
    }

    // Implement generateQuestionResults specific to MultiplicationTables
    generateQuestionResults(questions) {
        let questionResults = [];

        questions.forEach(question => {
            questionResults.push([question[0].subtract(question[1])]);
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
    testResultsEquality(userAnswer, correctAnswer) {
        userAnswer = new DecimalNumber(userAnswer);
        return userAnswer.equals(correctAnswer);
    }
}






