import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { rateLimit } from 'express-rate-limit';
import { encode } from 'html-entities';

import { RandomColor } from './utils/random-color.mjs';
import { RandomNumber } from './utils/random-number.mjs';
import { History } from './utils/history.mjs';
import { DatabaseClient } from './utils/database-client.mjs';

const app = express();
const port = 3000;

const colors = [];

const MILLIS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;

const limiter = rateLimit({
    windowMs: MILLIS_PER_SECOND * SECONDS_PER_MINUTE,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
});

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [
                "'self'"
            ],
            scriptSrc: [
                "'self'",
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/',
                'https://cdn.jsdelivr.net/npm/p5@1.11.10/'
            ],
            connectSrc: [
                "'self'",
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/'
            ]
        }
    }
}));
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.static('public'));

app.disable('x-powered-by');

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/randomColor', async (request, response) => {
  const hexColor = RandomColor.getRandomHex();
  const colorName = await RandomColor.getColorName(hexColor);
  response.render('random-color', { hexColor: hexColor, colorName: colorName });
});

app.get('/randomNumber', (request, response) => {
  response.render('random-number');
});

app.get('/history', async (request, response) => {
  const text = await History.getRandomThing();
  response.send(encode(text));
});

app.get('/palettes', async (request, response) => {
    const dbClient = new DatabaseClient();
    await dbClient.initConnection();
    const palettes = await dbClient.getAllPalettesWithColors();
    response.render('palettes', { palettes: palettes });
});

app.get('/api/randomColor', (request, response) => {
  const hexColor = RandomColor.getRandomHex();
  response.json({ color: hexColor });
});

app.get('/api/randomNumber', (request, response) => {
  const minValue = parseFloat(request.query.min);
  const maxValue = parseFloat(request.query.max);
  const randomNumber = RandomNumber.getRandomFloat(minValue, maxValue);
  response.json({ number: randomNumber });
});

app.use((request, response, next) => {
  response.status(404).render('errors/404');
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
