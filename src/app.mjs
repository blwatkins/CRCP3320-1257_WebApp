import express from 'express';

import { RandomColor } from './utils/random-color.mjs';
import { RandomNumber } from './utils/random-number.mjs';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/randomColor', (request, response) => {
  const hexColor = RandomColor.getRandomHex();
  response.send(`<html><head><title>Random Color</title></head><body style="background: ${hexColor};"></body></html>`);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
