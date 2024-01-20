/* function multiplications(nbExos = 5, nbDigits1 = 4, nbDigits2 = 3) {

    const consigne = ["Pose les multiplications suivantes :"];
    const exos = [];
    const resultats = [];
    const exemple = [];

    const nbDigits1Base = 10 ** (nbDigits1 - 1);
    const nbDigits2Base = 10 ** (nbDigits2 - 1);

    for (let i = 0; i < nbExos; i++) {
        const vEx1 = getRandomInt(nbDigits1Base, 10 * nbDigits1Base);
        const vEx2 = getRandomInt(nbDigits2Base, 10 * nbDigits2Base);
        exos.push(`${vEx1} x ${vEx2} = `);
        resultats.push(vEx1 * vEx2);
    }

    return { consigne, exos, resultats, exemple };
}
 */

function tablesDeMultiplication(nbExos = 10, tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {

    const consigne = ["De tête, résous les multiplications suivantes :"];
    const exos = [];
    const resultats = [];
    const exemple = [];
    
    const usedPairs = new Set();  // Set to keep track of used number pairs

    for (let i = 0; i < nbExos; i++) {
        let vEx1, vEx2, pair;
        do {
            vEx1 = tables[Math.floor(Math.random() * tables.length)];
            vEx2 = tables[Math.floor(Math.random() * tables.length)];
            pair = `${vEx1}*${vEx2}`; // Create a string representation of the pair
        } while (usedPairs.has(pair) || usedPairs.has(`${vEx2}*${vEx1}`));  // Ensure the pair or its reverse hasn't been used

        usedPairs.add(pair);  // Mark this pair as used
        exos.push(`${vEx1} x ${vEx2} = `);
        resultats.push(vEx1 * vEx2);
    }

    return { consigne, exos, resultats, exemple };
}


function divisions(nbExos = 5, nbDigits1 = 3, nbDigits2 = 2) {

    const consigne = ["Pose les division euclidiennes suivantes :"];
    const exos = [];
    const resultats = [];

    const nbDigits1Base = 10 ** (nbDigits1 - 1);
    const nbDigits2Base = 10 ** (nbDigits2 - 1);

    const vExemple1 = getRandomInt(nbDigits1Base, 10 * nbDigits1Base);
    const vExemple2 = getRandomInt(nbDigits2Base, 10 * nbDigits2Base);
    const exemple = [
        `${vExemple1} = ${vExemple2} x ${Math.floor(vExemple1 / vExemple2)} + ${vExemple1 % vExemple2}`,
        `La division de ${vExemple1} par ${vExemple2} a pour quotient ${Math.floor(vExemple1 / vExemple2)} et pour reste ${vExemple1 % vExemple2}`
    ];

    for (let i = 0; i < nbExos; i++) {
        const vEx1 = getRandomInt(nbDigits1Base, 10 * nbDigits1Base);
        const vEx2 = getRandomInt(nbDigits2Base, 10 * nbDigits2Base);
        exos.push([
            `${vEx1} divisé par ${vEx2}`,
            `${vEx1} = q x ${vEx2} + r`
        ]);
        resultats.push([Math.floor(vEx1 / vEx2), vEx1 % vEx2]);
    }

    return { consigne, exos, resultats, exemple };
}

function simplificationDecomposition(nbExos = 5) {

    const consigne = ["Enlève les 0 inutiles et écrit les nombres suivants comme dans l'exemple ci-dessous :"];
    const exos = [];
    const resultats = [];
    const exemple = [
        "000,0370 = 0,03 + 0,007",
        "0000846700,00050000 = 800000 + 40000 + 6000 + 700 + 0,0005",
        "054800,0000 = 50000 + 4000 + 800"
    ];

    for (let i = 0; i < nbExos; i++) {
        let vEx = "";
        let resultat = "";
        if (getRandomInt(0, 2) === 0) { // getRandomInt(0, 2) returns 0 or 1
            vEx += '0'.repeat(getRandomInt(1, 4));
            resultat += Array.from({ length: getRandomInt(1, 5) }, () => getRandomInt(1, 10)).join('');
            resultat += '0'.repeat(getRandomInt(1, 4));
            if (getRandomInt(0, 2) === 0) {
                resultat += '.' + '0'.repeat(getRandomInt(1, 4));
                resultat += Array.from({ length: getRandomInt(1, 5) }, () => getRandomInt(1, 10)).join('');
                vEx += resultat;
                vEx += '0'.repeat(getRandomInt(1, 4));
            } else {
                vEx += resultat;
                vEx += '.' + '0'.repeat(getRandomInt(2, 5));
            }
        } else {
            vEx += '0'.repeat(getRandomInt(1, 4));
            resultat += '0.' + '0'.repeat(getRandomInt(1, 5));
            resultat += Array.from({ length: getRandomInt(1, 5) }, () => getRandomInt(1, 10)).join('');
            vEx += resultat;
            vEx += '0'.repeat(getRandomInt(1, 4));
        }

        resultats.push(resultat);
        vEx += " = ";
        exos.push(vEx);
    }

    return { consigne, exos, resultats, exemple };
}

function soustractions(nbExos = 5, nbDigits = 8) {

    const consigne = ["Effectue les soustractions suivantes :"];
    const exos = [];
    const resultats = [];
    const exemple = [];

    const nbIntDigits = Math.pow(10, nbDigits - 2);
    const nbFracDigits = Math.pow(10, Math.floor(nbDigits / 2));

    for (let i = 0; i < nbExos; i++) {
        const vEx1 = getRandomInt(10 * nbIntDigits, 100 * nbIntDigits);
        const vEx2 = getRandomInt(nbIntDigits, vEx1 - 1);

        exos.push((vEx1 / nbFracDigits) + " - " + (vEx2 / nbFracDigits) + " = ");
        resultats.push((vEx1 - vEx2) / nbFracDigits);
    }

    return { consigne, exos, resultats, exemple };
}