class Exercise {
    constructor(name, exerciseInstructions, numInputs, inputPlaceholders, questions = null) {
        this.name = name;
        this.exerciseInstructions = exerciseInstructions;
        this.numInputs = numInputs;
        this.inputPlaceholders = inputPlaceholders;
        this.questions = questions || this.makeQuestions();
    }

    makeQuestions() {
        throw new Error('makeQuestions() must be implemented by subclasses');
    }

    generateQuestionInstructions() {
        throw new Error('generateQuestionInstructions() must be implemented by subclasses');
    }

    generateQuestionResults() {
        throw new Error('generateQuestionResults() must be implemented by subclasses');
    }

    makeExample() {
        throw new Error('makeExample() must be implemented by subclasses');
    }

    formatExampleResult() {
        throw new Error('formatExample() must be implemented by subclasses');
    }

    testResultsEquality() {
        throw new Error('testResultsEquality() must be implemented by subclasses');
    }

    setListener(listener) {
        this.listener = listener;
    }

    displayExercise(exerciseInstructions, questionInstructions, correctAnswers) {
        document.getElementById('instruction').textContent = exerciseInstructions[0];

        const exercisesContainer = document.getElementById('exercise');
        exercisesContainer.innerHTML = ''; // Clear previous exercises

        questionInstructions.forEach((questionInstruction, questionIndex) => {
            let exerciseElem = document.createElement('div');
            exerciseElem.className = 'question';

            this.displayQuestionInstruction(exerciseElem, questionInstruction);
            this.displayAnswerBox(exerciseElem, questionIndex, correctAnswers); // Pass questionIndex to displayAnswerBox

            exercisesContainer.appendChild(exerciseElem);
        });

        this.displayExample();

        MathJax.typesetPromise();

    }

    displayQuestionInstruction(exerciseElem, questionInstruction) {
        for (let i = 0; i < questionInstruction.length; i++) {
            const label = document.createElement('label');
            label.textContent = questionInstruction[i];
            label.className = 'instruction-part';
            exerciseElem.appendChild(label);
        }
    }

    displayAnswerBox(exerciseElem, questionIndex, correctAnswers) {
        const numInputs = this.numInputs;
        const inputPlaceholders = this.inputPlaceholders;
        // Assuming this method returns the correct answers
        const answerContainer = document.createElement('div');
        answerContainer.className = 'answer-container';

        // Calculate width based on the correct answers
        let inputWidth = getInputWidth(correctAnswers);


        for (let i = 0; i < numInputs; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = inputPlaceholders[i] || '';
            input.style.width = `${inputWidth}px`; // Set width
            input.className = 'answer';
            answerContainer.appendChild(input);
        }

        exerciseElem.appendChild(answerContainer);
    }


    displayExample() {
        const exampleDiv = document.getElementById('example');
        exampleDiv.innerHTML = ''; // Clear previous example

        const example = this.makeExample();

        if (example.length !== 0) {
            exampleDiv.style.display = 'block';

            const exampleTitle = document.createElement('h3');
            exampleTitle.textContent = 'Exemple :';
            exampleDiv.appendChild(exampleTitle);

            example.forEach(element => {
                const exampleParagraph = document.createElement('p');
                exampleParagraph.textContent = element;
                exampleDiv.appendChild(exampleParagraph);
            });

        } else {
            exampleDiv.style.display = 'none';
        }
    }

    getAnswers() {
        let answers = [];
        let answerInputs = [];

        const answerContainers = document.querySelectorAll('.answer-container');

        answerContainers.forEach(container => {
            let questionAnswers = [];
            let questionAnswerInputs = [];

            container.querySelectorAll('.answer').forEach(input => {
                questionAnswers.push(input.value);
                questionAnswerInputs.push(input);
            });

            answers.push(questionAnswers);
            answerInputs.push(questionAnswerInputs);
        });
        return { answers, answerInputs };
    }

    checkAnswers(questionResults, checkAnswersBtn) {
        let nbPoints, totalNbPoints;
        ({ nbPoints, totalNbPoints } = this.countNumberOfPoints(questionResults));

        const resultDiv = document.getElementById('result');
        if (nbPoints === totalNbPoints) {
            resultDiv.textContent = `Tout est correct ! Voici de nouveaux exercices.`;
            checkAnswersBtn.removeEventListener('click', this.checkAnswers)

            generateAndDisplayExercise(0); // Generate new exercises if all answers are correct
        } else {
            resultDiv.textContent = `Tu as trouvé ${nbPoints} bonnes réponses sur ${totalNbPoints} ! Réessaye.`;
        }
        resultDiv.className = 'result';
    }

    checkAnswer(answer, questionResult, answerInput) {
        if (this.testResultsEquality(answer, questionResult)) {
            answerInput.style.borderColor = 'green';
            return 1;
        } else {
            answerInput.style.borderColor = 'red';
            return 0;
        }
    }

    countNumberOfPoints(questionResults) {
        let { answers, answerInputs } = this.getAnswers();
        let nbPoints = 0;
        let totalNbPoints = 0;

        for (let i = 0; i < questionResults.length; i++) {
            for (let j = 0; j < questionResults[i].length; j++) {
                let answerInput = answerInputs[i][j]; // Directly use the answer input from the structured array

                nbPoints += this.checkAnswer(answers[i][j], questionResults[i][j], answerInput);

                totalNbPoints += 1;
            }
        }

        return { nbPoints, totalNbPoints };
    }
}