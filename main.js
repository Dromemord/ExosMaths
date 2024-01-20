const exercicesListe = [multiplications, tablesDeMultiplication, divisions, simplificationDecomposition, soustractions];
let numExo, nomExo;
let tryLoad;

document.addEventListener('DOMContentLoaded', () => {
    tryLoad = isExoSaved();
    generateAndDisplayExercise();
});

document.getElementById('secretButton').addEventListener('click', () => {
    numExo = (numExo + 1) % (exercicesListe.length);
    tryLoad = false;
    if (isNaN(numExo)) {
        numExo = getRandomInt(0, exercicesListe.length);
    }
    generateAndDisplayExercise(exerciseIndex = numExo);
});

function generateAndDisplayExercise(exerciseIndex = -1) {
    let exercice;
    let consigne, exos, resultats, exemple;

    if (tryLoad && isExoSaved()) {
        ({ numExo, consigne, exos, resultats, exemple } = loadExercise())
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
        tryLoad = saveExercise(numExo, consigne, exos, resultats, exemple);
    }

    nomExo = exercice.name;

    displayExercise(consigne, exos, resultats, exemple);
}

function displayExercise(consigne, exos, resultats, exemple) {

    displayConsigne(nomExo, consigne);
    displayQuestions(nomExo, exos);
    displayExample(nomExo, exemple);

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
        tryLoad = false;
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
        tryLoad = false;
        generateAndDisplayExercise(); // Generate new exercises if all answers are correct
    } else {
        resultDiv.textContent = `Tu as trouvé ${correctAnswers} bonnes réponses sur ${resultats.length * 2} ! Réessaye.`;
    }
    resultDiv.className = 'result';
}
