import knex from 'knex';
import config from '../../config/config.js';


const instance = knex({
    client: 'mysql',
    connection: config.DB.pg
});

//await instance('users').insert({user_id:10, token: 'sdfsfsdfsdf', password: 'sdfsdfdsf'});
//console.log('work');

export default instance;