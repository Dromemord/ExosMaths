function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getInputWidth(correctAnswers) {
    const pixelsPerCharacter = 8; // Estimate pixels per character
    let calculatedWidth = 0;

    for (let i = 0; i < correctAnswers.length; i++) {
        for (let j = 0; j < correctAnswers[0].length; j++) {
            calculatedWidth = Math.max(calculatedWidth, pixelsPerCharacter * correctAnswers[i][j].toString().length);
        }
    }
    return Math.max(calculatedWidth, 120);
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    return b === 0 ? a : gcd(b, a % b);
}

class Rational {
    constructor(numerator, denominator = 1) {
        if (typeof numerator === 'string' && numerator.includes('/')) {
            const parts = numerator.split('/');
            numerator = parseInt(parts[0], 10);
            denominator = parseInt(parts[1], 10);
            if (parts.length !== 2 || isNaN(numerator) || isNaN(denominator) || denominator === 0) {
                throw new Error("Invalid input format. Expected 'numerator/denominator'.");
            }
        }

        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }

        const gcdTemp = gcd(numerator, denominator);
        this.numerator = numerator / gcdTemp;
        this.denominator = denominator / gcdTemp;

        // Ensure denominator is positive
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
    }

    add(other) {
        return new Rational(
            this.numerator * other.denominator + other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }

    subtract(other) {
        return new Rational(
            this.numerator * other.denominator - other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }

    multiply(other) {
        return new Rational(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );
    }

    divide(other) {
        if (other.numerator === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return new Rational(
            this.numerator * other.denominator,
            this.denominator * other.numerator
        );
    }

    toString() {
        return `\\frac{${this.numerator}}{${this.denominator}}`;
    }

    equals(other){
        return this.numerator == other.numerator && this.denominator == other.denominator;
    }
}

class DecimalNumber {
    constructor(value) {
        if (Array.isArray(value) && value.length === 2) {
            // If the input is an array [p, q], where q is a power of 10
            const [p, q] = value;
            if (!Number.isInteger(p) || !Number.isInteger(q) || q <= 0 || !this.isPowerOfTen(q)) {
                throw new Error("Invalid input. Array must be of the form [p, q] where q is a positive power of 10.");
            }
            this.wholePart = Math.floor(p / q);
            this.fractionalPart = p % q;
            this.decimalPlaces = Math.log10(q);
        } else if (typeof value === 'string' && value.includes('.')) {
            // If the input is a string with a decimal point
            const [integerPart, fractionalPart] = value.split('.');
            this.wholePart = parseInt(integerPart, 10);
            this.fractionalPart = parseInt(fractionalPart, 10);
            this.decimalPlaces = fractionalPart.length;
        } else {
            // If the input is an integer or a string without a decimal point
            this.wholePart = parseInt(value, 10);
            this.fractionalPart = 0;
            this.decimalPlaces = 0;
        }

        while (this.fractionalPart !== 0 && this.fractionalPart % 10 === 0) {
            this.fractionalPart /= 10;
            this.decimalPlaces -= 1;
        }
    }

    isPowerOfTen(num) {
        while (num % 10 === 0 && num !== 1) {
            num /= 10;
        }
        return num === 1;
    }

    toString() {
        if (this.decimalPlaces === 0) {
            return this.wholePart.toString();
        }
        let fractionalPartStr = this.fractionalPart.toString().padStart(this.decimalPlaces, '0');
        return `${this.wholePart}.${fractionalPartStr}`;
    }

    add(other) {
        const commonScale = Math.pow(10, Math.max(this.decimalPlaces, other.decimalPlaces));
        const value1 = this.wholePart * commonScale + this.fractionalPart * (commonScale / Math.pow(10, this.decimalPlaces));
        const value2 = other.wholePart * commonScale + other.fractionalPart * (commonScale / Math.pow(10, other.decimalPlaces));
        return new DecimalNumber([(value1 + value2), commonScale]);
    }

    subtract(other) {
        const commonScale = Math.pow(10, Math.max(this.decimalPlaces, other.decimalPlaces));
        const value1 = this.wholePart * commonScale + this.fractionalPart * (commonScale / Math.pow(10, this.decimalPlaces));
        const value2 = other.wholePart * commonScale + other.fractionalPart * (commonScale / Math.pow(10, other.decimalPlaces));
        return new DecimalNumber([(value1 - value2), commonScale]);
    }

    multiply(other) {
        const commonScale = Math.pow(10, this.decimalPlaces + other.decimalPlaces);
        const value1 = (this.wholePart * Math.pow(10, this.decimalPlaces) + this.fractionalPart);
        const value2 = (other.wholePart * Math.pow(10, other.decimalPlaces) + other.fractionalPart);
        return new DecimalNumber([(value1 * value2), commonScale]);
    }

    decompose() {
        let wholeString = this.wholePart.toString();
        let fractString = this.fractionalPart.toString().padStart(this.decimalPlaces, '0');
        let decomposition = [];

        for (let i = 0; i < wholeString.length; i++) {
            if (wholeString[i] !== '0') {
                decomposition.push(wholeString[i].padEnd(wholeString.length - i, '0'));
            }
        }

        for (let i = 0; i < fractString.length; i++) {
            if (fractString[i] !== '0') {
                decomposition.push('0.' + fractString[i].padStart(i + 1, '0'));
            }
        }

        return decomposition.join(' + ');
    }

    equals(other) {
        return this.wholePart === other.wholePart && this.fractionalPart === other.fractionalPart && this.decimalPlaces === other.decimalPlaces;
    }

    lessThan(other) {
        // First compare the whole parts
        if (this.wholePart < other.wholePart) {
            return true;
        } else if (this.wholePart > other.wholePart) {
            return false;
        }

        // If whole parts are equal, compare the fractional parts
        // Adjust the fractional parts to have the same scale (number of decimal places)
        const maxDecimalPlaces = Math.max(this.decimalPlaces, other.decimalPlaces);
        const scaleDiff1 = maxDecimalPlaces - this.decimalPlaces;
        const scaleDiff2 = maxDecimalPlaces - other.decimalPlaces;
        const adjustedFractionalPart1 = this.fractionalPart * Math.pow(10, scaleDiff1);
        const adjustedFractionalPart2 = other.fractionalPart * Math.pow(10, scaleDiff2);

        return adjustedFractionalPart1 < adjustedFractionalPart2;
    }
}



