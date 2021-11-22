import config from './config/index.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user.js';

const app = express();

mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Database not connected ' + err);
  });

app.use(cors());

app.use(express.json());
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello to Monee Server ' + config.version);
});

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
