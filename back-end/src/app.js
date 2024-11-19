import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors';

import authenticateRouter from "./routes/authenticate.js";
import noticiaRouter from './routes/noticia.js';
import grupoRouter from './routes/grupo.js';
import transacaoRouter from './routes/transacao.js';
import categoriaRouter from './routes/categoria.js';

const app = express()

app.use(
    cors({
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );

app.use(logger('dev'))
app.use(json());
app.use(urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/', authenticateRouter);
app.use('/noticia', noticiaRouter);
app.use('/grupo', grupoRouter);
app.use('/transacao', transacaoRouter);
app.use('/categoria', categoriaRouter);

export default app