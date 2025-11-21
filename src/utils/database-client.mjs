import mysql from 'mysql2/promise';

export class DatabaseClient {
    #dbConnection;

    async initConnection() {
        try {
            this.#dbConnection = await mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                port: Number.parseInt(process.env.MYSQL_PORT)
            });
        } catch (error) {
            console.error('Error connecting to the database:', error);
            this.#dbConnection = null;
        }
    }

    async getAllPalettes() {
        const palettes = [];

        if (this.#dbConnection) {
            try {
                const [rows] = await this.#dbConnection.execute('SELECT * FROM palettes');
                palettes.push(...rows);
            } catch (error) {
                console.error('Error fetching palettes:', error);
            }
        }

        return palettes;
    }

    async getAllPalettesWithColors() {
        const palettes = [];

        if (this.#dbConnection) {
            try {
                const [rows] = await this.#dbConnection.execute('SELECT * FROM palettes, palette_colors WHERE palettes.id = palette_colors.palette_id');

                for (const row of rows) {
                    const palette = palettes.find(p => p.id === row.id);

                    if (palette) {
                        palette.colors.push(row.color_hex);
                    } else {
                        palettes.push({
                            id: row.id,
                            name: row.name,
                            source: row.source,
                            colors: [row.color_hex]
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching palettes:', error);
            }
        }

        console.log(palettes);
        return palettes;
    }
}
