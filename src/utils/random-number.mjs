export class RandomNumber {
    static getRandomFloat(value1, value2) {
        if (RandomNumber.isValidNumber(value1) && RandomNumber.isValidNumber(value2)) {
            const min = Math.min(value1, value2);
            const max = Math.max(value1, value2);
            return (Math.random() * (max - min)) + min;
        } else if (RandomNumber.isValidNumber(value1)) {
            const max = value1;
            return Math.random() * max;
        } else if (RandomNumber.isValidNumber(value2)) { 
            const max = value2;
            return Math.random() * max;
        } else {
            return Math.random();
        }
    }

    static isValidNumber(value) {
        return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);
    }
}
