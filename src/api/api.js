import * as axios from 'axios';

export const API = axios.create({
    withCredentials: true,
    baseURL: 'https://ergast.com/api/f1/',
})