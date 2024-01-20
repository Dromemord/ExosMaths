const exercicesListe = [multiplications, tablesDeMultiplication, divisions, simplificationDecomposition, soustractions];
let numExo, nomExo;
let tryLoad;

document.addEventListener('DOMContentLoaded', () => {
    tryLoad = isExoSaved();
    console.log(tryLoad);
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

    checkAnswersBtn.addEventListener('click', () => checkAnswers(nomExo, resultats));
}

