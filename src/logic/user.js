import instance from '../helper/knex.js';
import pkg from 'jsonwebtoken';
import UserHelper from '../helper/jwt.js';
import { jwtGenerator } from '../helper/jwt.js';

const { sign, decode, verify } = pkg;
const Service = {
    register: async (id, password) => {
        const user = await instance('users').select(id).where({ 'user_id': id });

        if (user.length > 0) {
            throw new Error('User already registered');
        }

        return await UserHelper.createUser(id, password);
    },
    login: async (id, password) => {
        const user = await instance('users').select(id).where({ 'user_id': id });

        if (user.length == 0) {
            throw new Error('User not found');
        }

        return await UserHelper.login(id, password);
    },
    refreshToken: async (refresh_token) => {
        const user = await instance('users').select('token').where({ 'refresh_token': refresh_token });

        if (user.length == 0) {
            throw new Error('Token not found');
        }

        const new_token = await jwtGenerator(user.id, user.password);
        await instance('users').where('refresh_token', refresh_token).first().update({'token': new_token});
        return new_token;
    },
    getInfo: async (token)=>{
        const user = verify(token, process.env.SECRET_KEY);

        return {'id':user.id};
    }
};

export default Service;