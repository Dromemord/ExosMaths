
function checkAnswers(nomExo, resultats) {
    if (nomExo === 'divisions') {
        checkDivisionAnswers(resultats);
    } else {
        checkRegularAnswers(resultats);
    }
}

function checkRegularAnswers(resultats) {
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