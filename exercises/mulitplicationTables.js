const multiplicationTables = {
    name: 'multiplicationTables',
    exerciseInstructions: ["De tête, résous les multiplications suivantes :"],

    makeQuestions: function (nbExos = 10, tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        let questions = [];

        const usedPairs = new Set();

        for (let i = 0; i < nbExos; i++) {
            do {
                vEx1 = tables[Math.floor(Math.random() * tables.length)];
                vEx2 = tables[Math.floor(Math.random() * tables.length)];
            } while (usedPairs.has([vEx1, vEx2]) || usedPairs.has([vEx2, vEx1]));
            usedPairs.add([vEx1, vEx2]);
            questions.push([vEx1, vEx2]);
        }

        return questions
    },

    generateQuestionInstructions: function (questions) {
        let questionInstructions = [];

        questions.forEach(question => {
            questionInstructions.push(`${question[0]} x ${question[1]} = `);
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





