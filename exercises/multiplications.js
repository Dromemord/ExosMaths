const multiplications = {
    exerciseInstructions: ["Pose les multiplications suivantes :"],

    makeQuestions: (nbExos = 5, nbDigits1 = 4, nbDigits2 = 3) => {
        let questions = [];

        const nbDigits1Base = 10 ** (nbDigits1 - 1);
        const nbDigits2Base = 10 ** (nbDigits2 - 1);

        for (let i = 0; i < nbExos; i++) {
            const vEx1 = getRandomInt(nbDigits1Base, 10 * nbDigits1Base);
            const vEx2 = getRandomInt(nbDigits2Base, 10 * nbDigits2Base);
            questions.push([vEx1, vEx2]);
        }

        return questions
    },

    generateQuestionInstructions: (questions) => {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push(`${question[0]} x ${question[1]} = `);
        });

        return questionInstructions;
    },

    generateQuestionResults: (questions) => {
        let questionResults = [];

        questions.forEach(question => {
            questionResults.push(question[0] * question[1]);
        });
        return questionResults;
    },
    makeExample: [],

    displayExercise: (exerciseInstructions, questionInstructions) => {
        document.getElementById('instruction').textContent = exerciseInstructions[0];

        const exercisesContainer = document.getElementById('exercises');
        exercisesContainer.innerHTML = ''; // Clear previous exercises

        questionInstructions.forEach(question => {
            let exerciseElem;

            exerciseElem = document.createElement('div');
            exerciseElem.className = 'exercise regular-exercise';

            displayQuestion(exerciseElem, question);
            displayAnswerBox(exerciseElem, question);

            exercisesContainer.appendChild(exerciseElem);
        });
    },

    displayQuestion: (exerciseElem, question) => {
        const label = document.createElement('label');
        label.textContent = question;
        label.className = 'consigne'; // Class for styling if needed

        exerciseElem.appendChild(label);
    },

    displayAnswerBox: (exerciseElem, question) => {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'answer';

        exerciseElem.appendChild(input);
    },

    displayVerifyButton: () => {
        const checkAnswersBtn = document.getElementById('checkAnswersBtn');
        // checkAnswersBtn.removeEventListener('click', checkAnswers);
        checkAnswersBtn.addEventListener('click', () => multiplications.checkAnswers(resultats));
    },

    getAnswers: () => {
        let answers = [];
        const answerInputs = document.querySelectorAll('.answer');

        answerInputs.forEach(answerInput => {
            answers.push(answerInput.value);
        });

        return { answers, answerInputs };
    },

    checkAnswers: (questionResults) => {
        let { answers, answerInputs } = getAnswers();
        
        for (let index = 0; index < questionResults.length; index++) {
            
            
        }

    }

    

}





