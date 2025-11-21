import express from 'express';

import { encode } from 'html-entities';

import { RandomColor } from './utils/random-color.mjs';
import { RandomNumber } from './utils/random-number.mjs';
import { History } from './utils/history.mjs';
import { WeatherClient } from './utils/weather-client.mjs';
import { DatabaseClient } from './utils/database-client.mjs';

const app = express();
const port = 3000;

const colors = [];

app.use(express.json());
app.use(express.static('public'));

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

app.get('/color/:colorName', (request, response) => {
  let colorName = request.params.colorName;
  colorName = encode(colorName);

  const results = colors.filter((color) => color.name.toLowerCase() === colorName.toLowerCase());

  if (results.length > 0) {
    colorName = results[0].hex;
  }

  response.send(`<html><head><title>${colorName}</title></head><body style="background: ${colorName};"><h1>${colorName}</h1></body></html>`);
});

app.get('/pictures', (request, response) => {
  response.render('pictures');
});

app.get('/history', async (request, response) => {
  const text = await History.getRandomThing();
  response.send(encode(text));
});

app.get('/weather', async (request, response) => {
  const temp = await WeatherClient.getCurrentTemperature();
  const conditions = await WeatherClient.getCurrentConditions();
  response.json({ temperature: temp, conditions: conditions });
});

app.get('/palettes', async (request, response) => {
    const dbClient = new DatabaseClient();
    await dbClient.initConnection();
    const palettes = await dbClient.getAllPalettesWithColors();
    response.render('palettes', { palettes: palettes });
});

// TODO - palette by id

// TODO - add a new palette

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

app.post('/api/color', (request, response) => {
  if (request.body && request.body.name && request.body.hex) {
    const colorName = encode(request.body.name);
    const colorHex = encode(request.body.hex);
    // TODO - validate that the hex value is properly formatted
    colors.push({ name: colorName, hex: colorHex });
    response.status(200).send('Success');
  } else {
    // bad request
    response.status(400).send('Bad Request');
  }
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
