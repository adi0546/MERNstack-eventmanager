import {combineReducers} from 'redux';
import eventsReducer from './eventReducer';

export default combineReducers({
    events:eventsReducer
});