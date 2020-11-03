import { API } from './api';

export const racersAPI = {
    getRacers(page = 1) {
        return API.get(`drivers.json?limit=20&offset=${page}`);
    }
}

export const racesAPI = {
    getRacerRaces(id) {
        return API.get(`drivers/${id}/circuits/monza/races.json`);
    }
}