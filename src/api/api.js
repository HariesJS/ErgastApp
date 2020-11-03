import * as axios from 'axios';

export const API = axios.create({
    baseURL: 'https://ergast.com/api/f1/',
})
