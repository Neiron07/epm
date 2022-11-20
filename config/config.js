import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), 'config', '.env') });

const config = {
    API: {
        PORT: 8000
    },
    DB: {
        pg: {
            host: process.env.DB_PG_HOST || 'db4free.net',
            port: process.env.DB_PG_PORT || 3306,
            user: process.env.DB_PG_USER || 'neiron01',
            password: process.env.DB_PG_PASSWORD || '3ih_P!<Iw24R9Xpa',
            database: process.env.DB_PG_DATABASE || 'testdatabase'
        },
    },
};

export default config;