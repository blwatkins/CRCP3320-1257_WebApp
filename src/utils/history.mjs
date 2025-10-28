export class History {
    static #data = null;

    static async getHistory() {
        if (History.#data == null) {
            const URL = 'http://history.muffinlabs.com/date';
            const response = await fetch(URL);

            if (response && response.ok && response.body) {
                History.#data = await response.json();
            }
        }
    }

    static async getRandomThing() {
        let text = '';
        
        if (!History.#data) {
            try {
                await History.getHistory();
            } catch (error) {
                console.error(error);
            }
        }

        if (History.#data) {
            const type = 'event'; // 'birth' or 'death'

            if (type === 'event') {
                const events = History.#data.data.Events;
                const randomIndex = Math.floor(Math.random() * events.length);
                const randomEvent = events[randomIndex];
                text = randomEvent.year + ' - ' + randomEvent.text;
            }
        }

        return text;
    }
}
