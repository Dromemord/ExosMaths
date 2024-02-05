const exerciseConstructors = [
    EuclidianDivision,
    MultiplicationTables,
    Multiplications,
    Substractions,
    MultiplicationsDecimalNumbers,
    Decompositions1
];

let numExo = -1;
let secretButtonListener = null;


document.addEventListener('DOMContentLoaded', () => {
    generateAndDisplayExercise();
});


function generateAndDisplayExercise() {
    numExo = (numExo + 1) % exerciseConstructors.length;

    // Create a new instance of the exercise
    let ExerciseClass = exerciseConstructors[numExo];
    let exercise = new ExerciseClass();

    displayExercise(exercise);
}


function displayExercise(exercise) {

    let exerciseInstructions = exercise.exerciseInstructions;
    let questions = exercise.makeQuestions();
    let questionInstructions = exercise.generateQuestionInstructions(questions);
    let questionResults = exercise.generateQuestionResults(questions);

    exercise.displayExercise(exerciseInstructions, questionInstructions, questionResults);
    console.log(questionResults);

    displayVerifyButton(exercise, questionResults);
    displaySecretButton(exercise);
}

function displayVerifyButton(exercise, questionResults) {
    const checkAnswersBtn = document.getElementById('checkAnswersBtn');
    // Store the reference to the listener
    const listener = () => exercise.checkAnswers(questionResults, checkAnswersBtn);
    checkAnswersBtn.addEventListener('click', listener);

    // Attach the listener reference to the exercise object so it can be removed later
    exercise.setListener(listener);
}

function displaySecretButton(exercise) {
    const checkAnswersBtn = document.getElementById('checkAnswersBtn');
    const secretButton = document.getElementById('secretButton');

    // Remove the previous listener if it exists
    if (secretButtonListener) {
        secretButton.removeEventListener('click', secretButtonListener);
    }

    // Define the new listener
    secretButtonListener = () => {
        if (exercise.listener) {
            checkAnswersBtn.removeEventListener('click', exercise.listener);
        }
        generateAndDisplayExercise();
    };

    // Add the new listener
    secretButton.addEventListener('click', secretButtonListener);
}