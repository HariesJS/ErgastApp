import { Alert } from "react-native";
import { racersAPI } from "../../api/ajax";

const GET_RACERS_DATA = 'ErgastApp/racingsReducer/GET-RACERS-DATA';
const LOADING_RACERS = 'ErgastApp/racingsReducer/LOADING-RACERS';
const LOAD_MORE_RACERS_DATA = 'ErgastApp/racingsReducer/LOAD-MORE-RACERS-DATA';

const initialState = {
    racers: null,
    loadingRacers: false
}

export const racersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RACERS_DATA: return {
            ...state,
            racers: action.racers
        }
        case LOADING_RACERS: return {
            ...state,
            loadingRacers: action.loadingRacers
        }
        case LOAD_MORE_RACERS_DATA: return {
            ...state,
            racers: {
                MRData: {
                    limit: action.racers.MRData.limit,
                    offset: action.racers.MRData.offset,
                    total: action.racers.MRData.total,
                    DriverTable: {
                        Drivers: [...state.racers.MRData.DriverTable.Drivers, ...action.racers.MRData.DriverTable.Drivers]
                    }
                }
            }
        };
        default:
            return state;
    }
}

const setLoadingRacersCreator = loadingRacers => ({
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
        Alert.alert('Response Error');
    } finally {
        !hideLoader && dispatch(setLoadingRacersCreator(false));
    }
}

export const loadMoreRacersDataThunk = page => async dispatch => {
    try {
        const response = await racersAPI.getRacers(page);
        dispatch({ type: LOAD_MORE_RACERS_DATA, racers: response.data });
    } catch (e) {
        Alert.alert('Response Error');
    }
}