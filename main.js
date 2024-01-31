const euclidianDivisionExercise = new EuclidianDivision();
const multiplicationTablesExercise = new MultiplicationTables();
const multiplicationsExercise = new Multiplications();
const substractionsExercise = new Substractions();
const multiplicationsDecimalNumbersExercise = new MultiplicationsDecimalNumbers();
const decompositions1 = new Decompositions1();


const exerciseList = [euclidianDivisionExercise, multiplicationTablesExercise, multiplicationsExercise, substractionsExercise, multiplicationsDecimalNumbersExercise, decompositions1];
let numExo, nomExo;
let tryLoad;

document.addEventListener('DOMContentLoaded', () => {
    tryLoad = isExoSaved();
    generateAndDisplayExercise();
});

document.getElementById('secretButton').addEventListener('click', () => {
    numExo = (numExo + 1) % (exerciseList.length);
    tryLoad = false;
    if (isNaN(numExo)) {
        numExo = getRandomInt(0, exerciseList.length);
    }
    generateAndDisplayExercise(exerciseIndex = numExo);
});

function generateAndDisplayExercise(exerciseIndex = -1) {
    if (exerciseIndex == -1) {
        numExo = 0;
    } else {
        numExo += 1;
    }
    let exercise = exerciseList[numExo];
    /*     let consigne, exos, resultats, exemple;
    
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
        } */

    nomExo = exercise.name;

    displayExercise(exercise);
}

function displayExercise(exercise) {

    let exerciseInstructions = exercise.exerciseInstructions;
    let questions = exercise.makeQuestions();
    let questionInstructions = exercise.generateQuestionInstructions(questions);
    let questionResults = exercise.generateQuestionResults(questions);

    exercise.displayExercise(exerciseInstructions, questionInstructions, questionResults);
    console.log(questionResults);
    exercise.displayVerifyButton(questionResults);
}

