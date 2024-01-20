function displayConsigne(nomExo, consigne) {
    document.getElementById('instruction').textContent = consigne[0];
}

function displayQuestions(nomExo, exos) {
    const exercisesContainer = document.getElementById('exercises');
    exercisesContainer.innerHTML = ''; // Clear previous exercises

    exos.forEach((question, index) => {
        let exerciseElem;
        if (nomExo === 'divisions') {
            exerciseElem = document.createElement('div');
            exerciseElem.className = 'exercise division-exercise';

            displayDivisionQuestion(exerciseElem, question);
            displayDivisionAnswerBox(exerciseElem, question);
        } else {
            exerciseElem = document.createElement('div');
            exerciseElem.className = 'exercise regular-exercise'; // Added class for specific styling
    
            displayRegularQuestion(exerciseElem, question);
            displayRegularAnswerBox(exerciseElem, question);
        }

        exercisesContainer.appendChild(exerciseElem);
    });

}

function displayRegularQuestion(exerciseElem, question) {

    const label = document.createElement('label');
    label.textContent = question;
    label.className = 'consigne'; // Class for styling if needed

    exerciseElem.appendChild(label);
}

function displayRegularAnswerBox(exerciseElem, question) {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'answer';

    exerciseElem.appendChild(input);
}

function displayDivisionQuestion(exerciseElem, question) {
    // Create separate elements for each part of the consigne
    const label1 = document.createElement('label');
    label1.textContent = question[0];
    label1.className = 'consigne-part'; // Add a class for styling if needed

    const label2 = document.createElement('label');
    label2.textContent = question[1];
    label2.className = 'consigne-part'; // Add a class for styling if needed

    exerciseElem.appendChild(label1);
    exerciseElem.appendChild(label2);
}

function displayDivisionAnswerBox(exerciseElem, question) {
    const answerContainer = document.createElement('div');
    answerContainer.className = 'answer-container';

    const inputQuotient = document.createElement('input');
    inputQuotient.type = 'number';
    inputQuotient.placeholder = 'q';
    inputQuotient.className = 'answer';

    const inputRemainder = document.createElement('input');
    inputRemainder.type = 'number';
    inputRemainder.placeholder = 'r';
    inputRemainder.className = 'answer';

    answerContainer.appendChild(inputQuotient);
    answerContainer.appendChild(inputRemainder);

    exerciseElem.appendChild(answerContainer);
}


