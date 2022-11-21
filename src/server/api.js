import Express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from '../../config/config.js';
import User from '../routes/user.js';
import FileRouter from '../routes/files.js';
import { hasAccess } from '../helper/auth.js';
import multer from 'multer';
import path from 'path';

const app = Express();

app.use(morgan('dev'));
app.use(cors({
  origin: '*'
}));
app.use(Express.static(path.join(process.cwd())));
app.use(multer({dest:'uploads'}).single('file'));
app.use(json());

app.use('', User);
app.use('/file', hasAccess, FileRouter);

async function startAPI(){
  try {
    app.listen(config.API.PORT, ()=> console.log(`API listen on http://localhost:${config.API.PORT}`));   
  } catch (e) {
    console.log(e);
  }
}

export default startAPI;