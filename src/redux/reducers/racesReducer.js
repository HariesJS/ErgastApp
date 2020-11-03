export const GET_RACER_RACES = 'ErgastApp/racesReducer/GET-RACER-RACES';
export const LOADING_RACER_RACES = 'ErgastApp/racesReducer/LOADING-RACER-RACES';
export const SET_RESPONSE_ERROR = 'ErgastApp/racesReducer/SET-RESPONSE-ERROR';

const initialState = {
    racerRaces: null,
    loadingRacerRaces: false,
    responseError: null
}

export const racesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RACER_RACES: return {
            ...state,
            racerRaces: action.racerRaces
        }
        case LOADING_RACER_RACES: return {
            ...state,
            loadingRacerRaces: action.loadingRacerRaces
        }
        case SET_RESPONSE_ERROR: return {
            ...state,
            responseError: action.responseError
        }
        default:
            return state;
    }
}