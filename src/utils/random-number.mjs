export class RandomNumber {
    static getRandomFloat(value1, value2) {
        if (typeof value1 === 'number' && typeof value2 === 'number') {
            const min = Math.min(value1, value2);
            const max = Math.max(value1, value2);
            return (Math.random() * (max - min)) + min;
        } else if (typeof value1 === 'number' && typeof value2 !== 'number') {
            const max = value1;
            return Math.random() * max;
        } else {
            return Math.random();
        }
    }
}
