export class RandomColor {
    static async getColorName(hexCode) {
        // const timeout = new Promise((resolve, reject) => {
        //     setTimeout(() => { resolve(5); }, 5_000); 
        // });
        // await timeout;

        const BASE_URL = 'https://api.color.pizza/v1/';
        const params = new URLSearchParams();
        const hexCodeValue = RandomColor.#convertHexToURLValue(hexCode);
        params.append('values',  hexCodeValue);
        const requestURL = `${BASE_URL}?${params.toString()}`;
        let colorName = undefined;
        
        try {
            const response = await fetch(requestURL);

            if (response && response.ok && response.body) {
                const data = await response.json();
                const colors = data.colors;

                if (colors && colors.length > 0) {
                    colorName = colors[0].name;
                }
            }
        } catch (error) {
            console.error(error);
        }

        return colorName;
    }

    static #convertHexToURLValue(hexCode) {
        return hexCode.replace('#', '').toLowerCase();
    }
    
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
