const exercicesListe = [multiplications, tablesDeMultiplication, divisions, simplificationDecomposition, soustractions];
let numExo, nomExo;
let savedIndex, consigneSave, exosSave, resultatsSave, exempleSave;

document.addEventListener('DOMContentLoaded', () => {

    savedIndex = parseInt(localStorage.getItem('savedIndex'));
    if (savedIndex === null) {
        savedIndex = -1;
    }
    consigneSave = JSON.parse(localStorage.getItem('consigneSave'));
    exosSave = JSON.parse(localStorage.getItem('exosSave'));
    resultatsSave = JSON.parse(localStorage.getItem('resultatsSave'));
    exempleSave = JSON.parse(localStorage.getItem('exempleSave'));

    generateAndDisplayExercise();
});

document.getElementById('secretButton').addEventListener('click', () => {
    numExo = (numExo + 1) % (exercicesListe.length);
    savedIndex = -1;
    if (isNaN(numExo)) {
        numExo = getRandomInt(0, exercicesListe.length);
    }
    generateAndDisplayExercise(exerciseIndex = numExo);
});

function generateAndDisplayExercise(exerciseIndex = -1) {
    let exercice;
    let consigne, exos, resultats, exemple;
    if (savedIndex !== -1) {
        numExo = savedIndex;
        consigne = consigneSave;
        exos = exosSave;
        resultats = resultatsSave;
        exemple = exempleSave;
        exercice = exercicesListe[numExo];
    } else {
        if (exerciseIndex !== -1) {
            numExo = exerciseIndex; // Use the passed exerciseIndex if it's not -1
            exercice = exercicesListe[numExo];
            ({ consigne, exos, resultats, exemple } = exercice())
        } else {
            numExo = getRandomInt(0, exercicesListe.length); // Assign a random exercise if -1 is passed
            exercice = exercicesListe[numExo];
            ({ consigne, exos, resultats, exemple } = exercice())
        }

        // Save the generated values
        savedIndex = numExo;
        consigneSave = consigne;
        exosSave = exos;
        resultatsSave = resultats;
        exempleSave = exemple;

        localStorage.setItem('savedIndex', savedIndex);
        localStorage.setItem('consigneSave', JSON.stringify(consigneSave));
        localStorage.setItem('exosSave', JSON.stringify(exosSave));
        localStorage.setItem('resultatsSave', JSON.stringify(resultatsSave));
        localStorage.setItem('exempleSave', JSON.stringify(exempleSave));
    }

    nomExo = exercice.name;

    displayExercise(consigne, exos, resultats, exemple);
}

function displayExercise(consigne, exos, resultats, exemple) {

    const exercisesContainer = document.getElementById('exercises');
    exercisesContainer.innerHTML = ''; // Clear previous exercises

    const examples = document.getElementById('examples');
    examples.innerHTML = ''; // Clear previous example

    if (nomExo === 'divisions' || nomExo == 'simplificationDecomposition') {
        examples.style.display = 'block';
    } else {
        examples.style.display = 'none';
    }

    // Exercise's instruction
    document.getElementById('instruction').textContent = consigne[0];

    // Exercise's questions and answer boxes
    if (nomExo === 'divisions') { // Division exercises
        const divisionExercises = document.getElementById('exercises');

        exos.forEach((exoPair, index) => {
            const exerciseElem = document.createElement('div');
            exerciseElem.className = 'exercise division-exercise';

            const questionContainer = document.createElement('div');
            questionContainer.className = 'question-container';

            const answerContainer = document.createElement('div');
            answerContainer.className = 'answer-container';

            // Create separate elements for each part of the consigne
            const label1 = document.createElement('label');
            label1.textContent = exoPair[0];
            label1.className = 'consigne-part'; // Add a class for styling if needed

            const label2 = document.createElement('label');
            label2.textContent = exoPair[1];
            label2.className = 'consigne-part'; // Add a class for styling if needed

            const inputQuotient = document.createElement('input');
            inputQuotient.type = 'number';
            inputQuotient.placeholder = 'q';
            inputQuotient.className = 'answer';

            const inputRemainder = document.createElement('input');
            inputRemainder.type = 'number';
            inputRemainder.placeholder = 'r';
            inputRemainder.className = 'answer';

            questionContainer.appendChild(label1);
            questionContainer.appendChild(label2);

            answerContainer.appendChild(inputQuotient);
            answerContainer.appendChild(inputRemainder);

            exerciseElem.appendChild(questionContainer);
            exerciseElem.appendChild(answerContainer);
            exercisesContainer.appendChild(exerciseElem);
        });

    } else {
        exos.forEach((exo, index) => {
            const exerciseElem = document.createElement('div');
            exerciseElem.className = 'exercise regular-exercise'; // Added class for specific styling

            const label = document.createElement('label');
            label.textContent = exo;
            label.className = 'consigne'; // Class for styling if needed

            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'answer';

            exerciseElem.appendChild(label);
            exerciseElem.appendChild(input);
            exercisesContainer.appendChild(exerciseElem);

        });

    }

    // exercise's example
    if (nomExo === 'divisions' || nomExo === 'simplificationDecomposition') {
        const exampleTitle = document.createElement('h3');
        exampleTitle.textContent = 'Exemple :';
        examples.appendChild(exampleTitle);

        exemple.forEach((ex) => {
            const exampleParagraph = document.createElement('p');
            exampleParagraph.textContent = ex;
            examples.appendChild(exampleParagraph);
        });
    }

    // Attach the correct answer checking function based on the exercise type
    const checkAnswersBtn = document.getElementById('checkAnswersBtn');
    checkAnswersBtn.removeEventListener('click', checkAnswers);
    checkAnswersBtn.removeEventListener('click', checkDivisionAnswers);

    // Add the appropriate event listener based on the type of exercise
    if (nomExo === 'divisions') { // If it's a division exercise
        checkAnswersBtn.addEventListener('click', () => checkDivisionAnswers(resultats));
    } else {
        checkAnswersBtn.addEventListener('click', () => checkAnswers(resultats));
    }
}

function checkAnswers(resultats) {
    let correctAnswers = 0;
    document.querySelectorAll('.answer').forEach((inputElem, index) => {
        if (nomExo === 'simplificationDecomposition') {
            if (inputElem.value === resultats[index]) {
                correctAnswers++;
                inputElem.style.borderColor = 'green';
            } else {
                inputElem.style.borderColor = 'red';
            }
        } else {
            if (parseFloat(inputElem.value) === resultats[index]) {
                correctAnswers++;
                inputElem.style.borderColor = 'green';
            } else {
                inputElem.style.borderColor = 'red';
            }
        }

    });

    const resultDiv = document.getElementById('result');
    if (correctAnswers === resultats.length) {
        resultDiv.textContent = `Tout est correct ! Voici de nouveaux exercices.`;
        savedIndex = -1;
        generateAndDisplayExercise(); // Generate new exercises if all answers are correct
    } else {
        resultDiv.textContent = `Tu as trouvé ${correctAnswers} bonnes réponses sur ${resultats.length * 2} ! Réessaye.`;
    }
    resultDiv.className = 'result';
}

function checkDivisionAnswers(resultats) {
    let correctAnswers = 0;
    const divisionExercises = document.querySelectorAll('.division-exercise');

    divisionExercises.forEach((exerciseElem, index) => {
        const inputs = exerciseElem.querySelectorAll('input.answer');
        const quotientInput = inputs[0];
        const remainderInput = inputs[1];
        const answerPair = resultats[index];

        let isCorrectQuotient = true;
        let isCorrectReste = true;

        if (parseInt(quotientInput.value) !== answerPair[0]) {
            quotientInput.style.borderColor = 'red';
            isCorrectQuotient = false;
        } else {
            quotientInput.style.borderColor = 'green';
        }

        if (parseInt(remainderInput.value) !== answerPair[1]) {
            remainderInput.style.borderColor = 'red';
            isCorrectReste = false;
        } else {
            remainderInput.style.borderColor = 'green';
        }

        if (isCorrectQuotient) {
            correctAnswers += 1; // Counting both quotient and remainder as separate correct answers
        }

        if (isCorrectReste) {
            correctAnswers += 1; // Counting both quotient and remainder as separate correct answers
        }

    });

    const resultDiv = document.getElementById('result');

    if (correctAnswers === resultats.length * 2) { // Multiplying by 2 because each question has 2 answers
        resultDiv.textContent = `Tout est correct ! Voici de nouveaux exercices.`;
        savedIndex = -1;
        generateAndDisplayExercise(); // Generate new exercises if all answers are correct
    } else {
        resultDiv.textContent = `Tu as trouvé ${correctAnswers} bonnes réponses sur ${resultats.length * 2} ! Réessaye.`;
    }
    resultDiv.className = 'result';
}
