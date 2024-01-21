const substractions = {
    name: 'substractions',
    exerciseInstructions: ["Effectue les soustractions suivantes :"],

    makeQuestions: function (nbExos = 5, nbDigits = 8) {
        let questions = [];

        const nbIntDigits = Math.pow(10, nbDigits - 2);
        const nbFracDigits = Math.pow(10, Math.floor(nbDigits / 2));
    
        for (let i = 0; i < nbExos; i++) {
            const vEx1 = getRandomInt(10 * nbIntDigits, 100 * nbIntDigits);
            const vEx2 = getRandomInt(nbIntDigits, vEx1 - 1);
            
            questions.push([vEx1/nbFracDigits, vEx2/nbFracDigits]);
        }

        return questions
    },

    generateQuestionInstructions: function (questions) {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push(`${question[0]} - ${question[1]} = `);
        });

        return questionInstructions;
    },

    generateQuestionResults: function (questions) {
        let questionResults = [];

        questions.forEach(question => {
            questionResults.push(question[0] * question[1]);
        });
        return questionResults;
    },
    makeExample: [],

    displayExercise: function (exerciseInstructions, questionInstructions) {
        document.getElementById('instruction').textContent = exerciseInstructions[0];

        const exercisesContainer = document.getElementById('exercises');
        exercisesContainer.innerHTML = ''; // Clear previous exercises

        questionInstructions.forEach(question => {
            let exerciseElem;

            exerciseElem = document.createElement('div');
            exerciseElem.className = 'exercise regular-exercise';

            this.displayQuestion(exerciseElem, question);
            this.displayAnswerBox(exerciseElem, question);

            exercisesContainer.appendChild(exerciseElem);
        });

        this.displayExample();
    },

    displayQuestion: function (exerciseElem, question) {
        const label = document.createElement('label');
        label.textContent = question;
        label.className = 'consigne'; // Class for styling if needed

        exerciseElem.appendChild(label);
    },

    displayAnswerBox: function (exerciseElem, question) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'answer';

        exerciseElem.appendChild(input);
    },

    displayExample: function () {
        const examples = document.getElementById('examples');
        examples.innerHTML = ''; // Clear previous example
        examples.style.display = 'none';
    },

    displayVerifyButton: function (questionResults) {
        const checkAnswersBtn = document.getElementById('checkAnswersBtn');
        // checkAnswersBtn.removeEventListener('click', checkAnswers);
        checkAnswersBtn.addEventListener('click', () => this.checkAnswers(questionResults, checkAnswersBtn));
    },

    getAnswers: function () {
        let answers = [];
        const answerInputs = document.querySelectorAll('.answer');

        answerInputs.forEach(answerInput => {
            answers.push(parseFloat(answerInput.value));
        });

        return { answers, answerInputs };
    },

    checkAnswers: function (questionResults, checkAnswersBtn) {
        let { answers, answerInputs } = this.getAnswers();
        let correctAnswers = 0;

        for (let index = 0; index < questionResults.length; index++) {
            if (answers[index] === questionResults[index]) {
                correctAnswers++;
                answerInputs[index].style.borderColor = 'green';
            } else {
                answerInputs[index].style.borderColor = 'red';
            }

        }

        const resultDiv = document.getElementById('result');
        if (correctAnswers === questionResults.length) {
            resultDiv.textContent = `Tout est correct ! Voici de nouveaux exercices.`;
            tryLoad = false;
            checkAnswersBtn.removeEventListener('click', this.checkAnswers)
            generateAndDisplayExercise(); // Generate new exercises if all answers are correct
        } else {
            resultDiv.textContent = `Tu as trouvé ${correctAnswers} bonnes réponses sur ${questionResults.length} ! Réessaye.`;
        }
        resultDiv.className = 'result';
    }
}





