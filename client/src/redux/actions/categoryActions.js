import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import { tokenConfig } from './authActions';
import { returnErrors,clearErrors } from './errorActions';

export const getCategory = () => async dispatch => {
    dispatch(setCategoryLoading());
   try {
      const res = await axios.get('/api/categories');
       dispatch({
         type: actionTypes.GET_CATEGORIES,
         payload: res.data,
       });
      dispatch(clearErrors());
   } catch (err) {
      dispatch(returnErrors(err.response.data.msg,err.response.status));
      console.log('Error dispatching GET_CATEGORIES: ', err.response.data.message, err);
   }
};

export const addCategory = item => async (dispatch, getState) => {
   try {
      console.log(item)
      const res = await axios.post('/api/categories', item, tokenConfig(getState, dispatch));
      
      dispatch({
         type: actionTypes.ADD_CATEGORY,
         payload: res.data,
      });
      dispatch(clearErrors());
   } catch (err) {
      dispatch({
         type: actionTypes.GET_ERRORS,
         payload: err.response.data,
      });
      console.log('Error dispatching ADD_CATEGORY : ', err.response.data.message, err);
      dispatch(returnErrors(err.response.data.msg, err.response.data.status, 'ADD_CATEGORY_ERROR'));
   }
};

export const deleteCategory = _id => async (dispatch, getState) => {
   try {
      await axios.delete('/api/categories/' + _id, tokenConfig(getState, dispatch));
      dispatch({
         type: actionTypes.DELETE_CATEGORY,
         payload: _id,
      });
      dispatch(clearErrors());
   } catch (err) {
      dispatch({
         type: actionTypes.GET_ERRORS,
         payload: err.response.data,
      });
      console.log('Error dispatching DELETE_CATEGORY: ', err.response.data.message, err);
   }
};

export const setCategoryLoading = () => {
   return {
      type: actionTypes.CATEGORIES_LOADING,
   };
};
