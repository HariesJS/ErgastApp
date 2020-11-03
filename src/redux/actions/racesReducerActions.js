import { racesAPI } from "../../api/ajax";
import { GET_RACER_RACES, LOADING_RACER_RACES, SET_RESPONSE_ERROR } from "../reducers/racesReducer";

export const setLoadingRacerRacesCreator = loadingRacerRaces => ({
    type: LOADING_RACER_RACES,
    loadingRacerRaces
})

export const setResponseErrorCreator = responseError => ({
    type: SET_RESPONSE_ERROR,
    responseError
})

export const getRacerRacesThunk = id => async dispatch => {
    try {
        dispatch(setLoadingRacerRacesCreator(true));
        const response = await racesAPI.getRacerRaces(id);
        dispatch({ type: GET_RACER_RACES, racerRaces: response.data });
        dispatch(setLoadingRacerRacesCreator(false));
    } catch (e) {
        dispatch(setResponseErrorCreator('Response Error'));
    }
}