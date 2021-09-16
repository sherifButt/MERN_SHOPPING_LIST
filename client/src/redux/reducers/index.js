import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const reducers = combineReducers({
   item: itemReducer
})

export default reducers;