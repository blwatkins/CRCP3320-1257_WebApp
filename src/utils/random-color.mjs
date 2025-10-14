export class RandomColor {
    static getRandomHex() {
        let hexColor = '#';

        for (let i = 0; i < 6; i++) {
            hexColor += RandomColor.#getRandomHexCharacter();
        }

        return hexColor;
    }

    static #getRandomHexCharacter() {
        const hexCharacters = '0123456789ABCDEF';
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);

        if (randomIndex >= 0 && randomIndex < hexCharacters.length) {
            return hexCharacters.charAt(randomIndex);
        }

        return '0';        
    }
}
