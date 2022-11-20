import instance from '../helper/knex.js';
import moment from 'moment';

const Service ={
    getTourById: async (id) => {
        const res = await instance('tournaments').where('id', id).select('*');
        return res;
    },
    getAllTour: async () => {
        const res = await instance('tournaments').select('*');
        return res;
    },
    createTour: async (data) => {
        // moment time
        const time = moment().format();
        const {game_id, title, descriptions, prize_pool} = data.body; 
        const tournament = {
            game_id : +game_id,
            title : title,
            descriptions : descriptions,
            prize_pool : prize_pool,
            tima_and_date : time,
        };
        const res = await instance('tournaments').insert(tournament).returning('id');
        return res;
    }
};

export default Service;