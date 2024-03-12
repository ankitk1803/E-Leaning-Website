import {Redis} from 'ioredis';
require('dotenv').config();
const redisClient = () =>{
    if(process.env.REDIS_URL){
        console.log(`Redis connected`);
        // return new Redis(process.env.REDIS_URL);
        return process.env.REDIS_URL;
    }
    throw new Error('Redis connection failed')
};
export const redis = new Redis(redisClient());