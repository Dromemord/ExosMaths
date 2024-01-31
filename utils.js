function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function decomposeNumber(number) {
    let integerPart = Math.floor(number);
    let decimalPart = number - integerPart;
    let decomposition = [];
    let placeValue = 1;
    let precision = 12; // Set the precision you need

    // Process integer part
    while (integerPart > 0) {
        let digit = integerPart % 10;
        if (digit > 0) {
            decomposition.unshift(digit * placeValue);
        }
        integerPart = Math.floor(integerPart / 10);
        placeValue *= 10;
    }

    // Process decimal part
    let decimalPlaceValue = 0.1;
    let decimalStr = decimalPart.toFixed(precision).slice(2); // Remove '0.' and round to the precision
    for (let i = 0; i < decimalStr.length; i++) {
        let digit = parseInt(decimalStr.charAt(i));
        if (digit > 0) {
            let value = parseFloat((digit * decimalPlaceValue).toFixed(precision - i)); // Round the number and remove trailing zeros
            if (value !== 0) { // Check if value is non-zero
                decomposition.push(value.toString()); // Convert back to string to maintain format
            }
        }
        decimalPlaceValue /= 10;
    }

    return decomposition.join(' + ');
}

function getInputWidth(correctAnswers){
    const pixelsPerCharacter = 8; // Estimate pixels per character
    let calculatedWidth = 0;
    
    for (let i = 0; i < correctAnswers.length; i++) {
        for (let j = 0; j < correctAnswers[0].length; j++) {
            calculatedWidth = Math.max(calculatedWidth, pixelsPerCharacter*correctAnswers[i][j].toString().length);
        }        
    }
    return Math.max(calculatedWidth, 120);
}

