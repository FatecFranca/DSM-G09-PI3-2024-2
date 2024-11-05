import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import authenticateRouter from "./routes/authenticate.js";
import noticiaRouter from './routes/noticia.js';


const app = express()

app.use(logger('dev'))
app.use(json());
app.use(urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/', authenticateRouter);
app.use('/noticia', noticiaRouter);

export default app