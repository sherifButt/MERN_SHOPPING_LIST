import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import categoryReducer from './categoryReducer'
import counterReducer from './counterReducer'

const reducers = combineReducers({
   item: itemReducer,
   auth: authReducer,
   error: errorReducer,
   category: categoryReducer,
   count: counterReducer
});

export default reducers;