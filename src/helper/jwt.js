import pkg from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import instance from '../helper/knex.js';
import config from '../../config/config.js';
const { sign, decode, verify } = pkg;

export async function jwtGenerator(id, password) {
    const token = await sign({ id: id, password: password }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
}

export async function jwtRefreshToken(id, password) {
    const refreshToken = await sign({ id: id, password: password }, process.env.refreshTokenSecret, { expiresIn: process.env.refreshTokenLife });

    return refreshToken;
}

const Helper = {
    createUser: async (id, password) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const token = await jwtGenerator(id, password);
        const refreshToken = await jwtRefreshToken(id, password);
        const res = await instance('users').insert({ 'user_id': id, 'token': token, 'refresh_token': refreshToken, 'password': hashPassword }).then(row => { return instance('users').where('id', row[0]).first(); });
        return res;
    },
    login: async (id, password) => {
        const token = await jwtGenerator(id, password);
        const refreshToken = await jwtRefreshToken(id, password);
        await instance('users').where('id', id).first().update({'token': token, 'refresh_token': refreshToken});
        return { 'token': token, 'refresh_token': refreshToken };
    }
};

export default Helper;