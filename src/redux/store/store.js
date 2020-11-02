import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { racersReducer } from '../reducers/racersReducer';
import { racesReducer } from '../reducers/racesReducer';

const reducers = combineReducers({
    racersAPI: racersReducer,
    racesAPI: racesReducer
});

export default createStore(reducers, applyMiddleware(thunk));