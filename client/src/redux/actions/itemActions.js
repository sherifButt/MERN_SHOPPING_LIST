import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import { returnErrors, clearError } from './errorActions';
import {tokenConfig} from './authActions'

export const getItems = () => async dispatch => {
   dispatch(setItemsLoading());
   try {
      const res = await axios.get('/api/items');
      await dispatch({
         type: actionTypes.GET_ITEMS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: actionTypes.GET_ERRORS,
         payload: err.response.data,
      });
      console.log('Error dispatching GET_ITEMS: ', err.response.data.message, err);
   }
};

export const addItem = name => async (dispatch,getState) => {
   try {
      const res = await axios.post('/api/items', name, tokenConfig(getState,dispatch));
      dispatch({
         type: actionTypes.ADD_ITEM,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: actionTypes.GET_ERRORS,
         payload: err.response.data,
      });
      console.log('Error dispatching ADD_ITEM : ', err.response.data.message, err);
      dispatch(returnErrors(err.response.data.msg, err.response.data.status, 'ADD_ITEM_ERROR'));
   }
};

export const deleteItem = _id => async (dispatch,getState) => {
   try {

      await axios.delete('/api/items/' + _id, tokenConfig(getState, dispatch));
      dispatch({
         type: actionTypes.DELETE_ITEM,
         payload: _id,
      });
   } catch (err) {
      dispatch({
         type: actionTypes.GET_ERRORS,
         payload: err.response.data,
      });
      console.log('Error dispatching DELETE_ITEM: ', err.response.data.message, err);
   }
};

export const setItemsLoading = () => {
   return {
      type: actionTypes.ITEMS_LOADING,
   };
};
