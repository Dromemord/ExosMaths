function saveExercise(numExo, consigne, exos, resultats, exemple) {
    localStorage.setItem('numExo', numExo);
    localStorage.setItem('consigne', JSON.stringify(consigne));
    localStorage.setItem('exos', JSON.stringify(exos));
    localStorage.setItem('resultats', JSON.stringify(resultats));
    localStorage.setItem('exemple', JSON.stringify(exemple));

    return true;
}

function loadExercise() {
    let numExo = parseInt(localStorage.getItem('numExo'));
    let consigne = JSON.parse(localStorage.getItem('consigne'));
    let exos = JSON.parse(localStorage.getItem('exos'));
    let resultats = JSON.parse(localStorage.getItem('resultats'));
    let exemple = JSON.parse(localStorage.getItem('exemple'));

    return { numExo, consigne, exos, resultats, exemple };
}

function removeExercise() {
    localStorage.removeItem('numExo', numExo);
    localStorage.removeItem('consigne', JSON.stringify(consigne));
    localStorage.removeItem('exos', JSON.stringify(exos));
    localStorage.removeItem('resultats', JSON.stringify(resultats));
    localStorage.removeItem('exemple', JSON.stringify(exemple));
    
    return false;
}

function isExoSaved() {
    return parseInt(localStorage.getItem('numExo')) !== null && ! isNaN(parseInt(localStorage.getItem('numExo')));
}