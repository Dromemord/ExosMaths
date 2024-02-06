class Decompositions1 extends Exercise {
    constructor(questions = null) {
        // Call the constructor of the parent class
        super('Decompositions1', ["Décompose le nombres suivants comme dans l'exemple :"], 1, '', questions);
    }

    // Implement makeQuestions specific to MultiplicationTables
    makeQuestions(nbExos = 10) {
        let questions = [];

        // Function to generate a digit with a higher probability of being zero
        const generateDigit = () => {
            // Probability distribution (e.g., 80% chance of zero, 20% chance of 1-9)
            return Math.random() < 0.4 ? 0 : Math.floor(Math.random() * 9) + 1;
        };
        for (let i = 0; i < nbExos; i++) {
            let numberStr = '';

            // Generate the integer part with up to 5 digits
            for (let j = 0; j < 5; j++) {
                numberStr += generateDigit();
            }

            // Append decimal point
            numberStr += '.';

            // Generate the decimal part with up to 5 digits
            for (let j = 0; j < 5; j++) {
                numberStr += generateDigit();
            }

            // Convert the string to a number and ensure it does not have trailing zeros in the decimal part
            let number = new DecimalNumber(numberStr);

            
            questions.push([number]);
        }
        return questions;
    }


    // Implement generateQuestionInstructions specific to MultiplicationTables
    generateQuestionInstructions(questions) {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push([`${question[0]} = `]);
        });

        return questionInstructions;
    }

    // Implement generateQuestionResults specific to MultiplicationTables
    generateQuestionResults(questions) {
        let questionResults = [];

        questions.forEach(question => {
            console.log(question[0]);
            questionResults.push([question[0].decompose()]);
        });
        return questionResults;
    }

    // Implement makeExample specific to MultiplicationTables
    makeExample() {
        let question = [this.makeQuestions(1)][0];
        let questionInstruction = this.generateQuestionInstructions(question)[0];

        let questionResult = this.generateQuestionResults(question)[0];

        return questionInstruction.concat(questionResult);
    }

    // Implement formatExample specific to MultiplicationTables
    formatExampleResult() {
        return null;
    }

    // Implement testResultsEquality specific to MultiplicationTables
    testResultsEquality(userAnswer, correctAnswer) {
        // Function to clean, parse, and sort the parts of the answer
        const prepareAnswer = (answer) => {
            return answer
                .split('+') // Split by the '+' sign
                .map(part => part.trim()) // Remove any surrounding whitespace
                .map(part => new DecimalNumber(part)) // Convert each part to a number
                .sort((a, b) => {
                    // Custom sorting for DecimalNumber objects
                    if (a.equals(b)) {
                        return 0; // a and b are equal
                    } else if (a.lessThan(b)) {
                        return -1; // a is less than b
                    } else {
                        return 1; // a is greater than b
                    }
                });
        };

        // Prepare both the user's answer and the correct answer
        const userNumbers = prepareAnswer(userAnswer);
        const correctNumbers = prepareAnswer(correctAnswer);
        // Check if both arrays have the same length
        if (userNumbers.length !== correctNumbers.length) {
            return false;
        }

        // Check each element in the arrays
        for (let i = 0; i < userNumbers.length; i++) {
            // Use a threshold for comparison to handle floating point precision issues
            if (!userNumbers[i].equals(correctNumbers[i])) {
                return false;
            }
        }

        // If all checks passed, the answers match
        return true;
    }

}





