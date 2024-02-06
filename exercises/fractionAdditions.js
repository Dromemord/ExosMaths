class FractionAdditions extends Exercise {
    constructor(questions = null) {
        // Call the constructor of the parent class
        super('FractionAdditions', ["Additionne les fractions suivantes :"], 1, '', questions);
    }

    // Implement makeQuestions specific to MultiplicationTables
    makeQuestions(nbExos = 5) {
        let questions = [];

        for (let i = 0; i < nbExos; i++) {
            const num1 = getRandomInt(0,12);
            const dem1 = getRandomInt(1,12);
            
            const num2 = getRandomInt(0,12);
            const dem2 = getRandomInt(1,12);
            

            questions.push([new Rational(num1, dem1), new Rational(num2, dem2)]);
        }

        return questions
    }
    // Implement generateQuestionInstructions specific to MultiplicationTables
    generateQuestionInstructions(questions) {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push(['\\[' + question[0].toString() + ' + ' + question[1].toString() + ' = \\]']);
        });

        return questionInstructions;
    }

    // Implement generateQuestionResults specific to MultiplicationTables
    generateQuestionResults(questions) {
        let questionResults = [];

        questions.forEach(question => {
            questionResults.push([question[0].add(question[1])]);
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
        userAnswer = new Rational(userAnswer);
        return userAnswer.equals(correctAnswer);
    }
}






