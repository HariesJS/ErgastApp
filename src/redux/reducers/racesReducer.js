import { Alert } from "react-native";
import { racesAPI } from "../../api/ajax";

const GET_RACER_RACES = 'ErgastApp/racesReducer/GET-RACER-RACES';
const LOADING_RACER_RACES = 'ErgastApp/racesReducer/LOADING-RACER-RACES';

const initialState = {
    racerRaces: null,
    loadingRacerRaces: false
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
        default:
            return state;
    }
}

const setLoadingRacerRacesCreator = loadingRacerRaces => ({
    type: LOADING_RACER_RACES,
    loadingRacerRaces
})

export const getRacerRacesThunk = id => async dispatch => {
    try {
        dispatch(setLoadingRacerRacesCreator(true));
        const response = await racesAPI.getRacerRaces(id);
        dispatch({ type: GET_RACER_RACES, racerRaces: response.data });
        dispatch(setLoadingRacerRacesCreator(false));
    } catch (e) {
        Alert.alert('Response Error');
    }
}