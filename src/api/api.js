import * as axios from 'axios';

export const API = axios.create({
    withCredentials: true,
    baseURL: 'http://ergast.com/api/f1/',
})
