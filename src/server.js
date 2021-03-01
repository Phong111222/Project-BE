import express from 'express';
import AuthRouter from './routes/Auth/router';
import cors from 'cors';
import 'colors';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import ConnectMongo from './database/connectMongo';
import baseAuth from './middlewares/baseAuth';
ConnectMongo.getConnect();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', baseAuth, AuthRouter);

app.use(ErrorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`.cyan);
});
