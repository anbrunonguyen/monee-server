import config from './config/index.js';
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
