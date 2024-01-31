class EuclidianDivision extends Exercise {
    constructor(questions = null) {
        // Call the constructor of the parent class
        // numInputs = 2 (quotient and remainder) and placeholders are 'q' for quotient and 'r' for remainder
        super('EuclidianDivision', ["Pose les divisions euclidiennes suivantes :"], 2, ['q', 'r'], questions);
    }

    // Implement makeQuestions specific to EuclidianDivision
    makeQuestions(nbExos = 5, maxDividend = 100, minDivisor = 2, maxDivisor = 10) {
        let questions = [];

        for (let i = 0; i < nbExos; i++) {
            const dividend = Math.floor(Math.random() * (maxDividend - 1)) + 1; // Random number between 1 and maxDividend
            const divisor = Math.floor(Math.random() * (maxDivisor - minDivisor + 1)) + minDivisor; // Random number between minDivisor and maxDivisor
            questions.push([dividend, divisor]);
        }

        return questions;
    }

    // Implement generateQuestionInstructions specific to EuclidianDivision
    generateQuestionInstructions(questions) {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push([`${question[0]} divisé par ${question[1]}`, `${question[0]} = q x ${question[1]} + r`]);
        });

        return questionInstructions;
    }

    // Implement generateQuestionResults specific to EuclidianDivision
    generateQuestionResults(questions) {
        let questionResults = [];

        questions.forEach(question => {
            const quotient = Math.floor(question[0] / question[1]);
            const remainder = question[0] % question[1];
            questionResults.push([quotient, remainder]);
        });

        return questionResults;
    }

    // Implement makeExample specific to EuclidianDivision
    makeExample() {
        let question = [this.makeQuestions(1)][0];
        let questionInstruction = this.generateQuestionInstructions(question)[0];

        let questionResult = this.generateQuestionResults(question)[0];
        questionResult = this.formatExampleResult(question[0], questionResult);

        return questionInstruction.concat(questionResult);
    }

    // Implement formatExample specific to EuclidianDivision
    formatExampleResult(question, questionResult) {
        return [`La division de ${question[0]} par ${question[1]} a pour quotient ${questionResult[0]} et pour reste ${questionResult[1]}`,
        `${question[0]} = ${questionResult[0]} x ${question[1]} + ${questionResult[1]}`];
    }

    // Implement testResultsEquality specific to EuclidianDivision
    testResultsEquality(answer, questionResult) {
        return parseFloat(answer) === questionResult;
    }
}