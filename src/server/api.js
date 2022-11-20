import Express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from '../../config/config.js';
import User from '../routes/user.js';

const app = Express();

app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));
app.use(json());
app.use('', User);

async function startAPI(){
    try {
        app.listen(config.API.PORT, ()=> console.log(`API listen on http://localhost:${config.API.PORT}`));   
    } catch (e) {
        console.log(e);
    }
}

export default startAPI;