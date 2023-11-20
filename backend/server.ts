import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { userRouter } from './routes/userRouter';
import { prodRouter } from './routes/productsRouter';
import reviewsRouter from './routes/reviewsRouter';
import { db } from './db'
import bodyParser from 'body-parser';
dotenv.config();
const jsonParser = bodyParser.json();
const app: Express = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/users",userRouter);
app.use("/products", prodRouter);
app.use("/reviews", reviewsRouter);
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/acasa.html'));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

// Verifică conexiunea la baza de date
db.connect((err) => {
  if (err) {
    console.error('Eroare la conectarea la baza de date:', err);
    process.exit(1); 
  }
  console.log('Conectare la baza de date reușită!');
});