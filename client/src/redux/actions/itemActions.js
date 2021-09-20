import axios from 'axios';
import { actionTypes } from '../constants/actionTypes';

export const getItems = () => async dispatch => {
   dispatch(setItemsLoading());
   try {
      const res = await axios.get('/api/items');
      await dispatch({
         type: actionTypes.GET_ITEMS,
         payload: res.data,
      });
   } catch (err) {
      console.log('Error dispatching GET_ITEMS: ', err);
   }
};

export const addItem = name => async dispatch => {
   try {
      const res = await axios.post('/api/items', name);
      await dispatch({
         type: actionTypes.ADD_ITEM,
         payload: res.data,
      });
   } catch (err) {
      console.log('Error dispatching ADD_ITEM: ', err);
   }
};

export const deleteItem = _id => async dispatch => {
   try {
      await axios.delete('/api/items/' + _id);
      dispatch({
         type: actionTypes.DELETE_ITEM,
         payload: _id
      })

   } catch (err) {
      console.log('Error dispatching DELETE_ITEM: ', err);
   }
};

export const setItemsLoading = () => {
   return {
      type: actionTypes.ITEMS_LOADING,
   };
};
