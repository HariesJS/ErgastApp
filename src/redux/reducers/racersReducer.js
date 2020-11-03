export const GET_RACERS_DATA = 'ErgastApp/racingsReducer/GET-RACERS-DATA';
export const LOADING_RACERS = 'ErgastApp/racingsReducer/LOADING-RACERS';
export const LOAD_MORE_RACERS_DATA = 'ErgastApp/racingsReducer/LOAD-MORE-RACERS-DATA';

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