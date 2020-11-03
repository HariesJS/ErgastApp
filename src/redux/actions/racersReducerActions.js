import { racersAPI } from "../../api/ajax";
import { GET_RACERS_DATA, LOADING_RACERS, LOAD_MORE_RACERS_DATA } from "../reducers/racersReducer";
import { setResponseErrorCreator } from "./racesReducerActions";

export const setLoadingRacersCreator = loadingRacers => ({
    type: LOADING_RACERS,
    loadingRacers
});

export const getRacersDataThunk = (hideLoader) => async dispatch => {
    try {
        !hideLoader && dispatch(setLoadingRacersCreator(true));
        const response = await racersAPI.getRacers();
        dispatch({ type: GET_RACERS_DATA, racers: response.data });
        !hideLoader && dispatch(setLoadingRacersCreator(false));
    } catch (e) {
        dispatch(setResponseErrorCreator('Response Error'));
        console.warn(e);
    } finally {
        !hideLoader && dispatch(setLoadingRacersCreator(false));
    }
}

export const loadMoreRacersDataThunk = page => async dispatch => {
    try {
        const response = await racersAPI.getRacers(page);
        dispatch({ type: LOAD_MORE_RACERS_DATA, racers: response.data });
    } catch (e) {
        dispatch(setResponseErrorCreator('Response Error'));
    }
}