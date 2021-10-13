import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import { tokenConfig } from './authActions';
import { returnErrors, clearErrors } from './errorActions';

export const getItems = () => async dispatch => {
   dispatch(setItemsLoading());
   try {
      const res = await axios.get('/api/items');

      // const itemsOriginal = JSON.parse(JSON.stringify(res.data));
      const items = res.data;
      items.sort((a, b) => a.order - b.order);

      // add order number to empty order field
   //   items.map((item, i) => (item.order = i));
      // console.log('-->2', items,itemsOriginal);

      // for (let i = 0; i < items.length; i++) {
      //    console.log(i, items[i].order, itemsOriginal[i].order);
      //    if (items[i].order != itemsOriginal[i].order) {
      //        dispatch(itemDndReOrder(items[i]._id,null, i));
      //    }
      // }

      await dispatch({
         type: actionTypes.GET_ITEMS,
         payload: items,
      });

      // dispatch(clearErrors);
   } catch (err) {
      dispatch(
         returnErrors(
            err.response ? err.response.data.msg : 'faild to connect to databse',
            err.response ? err.response.status : '500'
         )
      );
      console.log(
         'Error dispatching GET_ITEMS: ',
         err.response ? err.response.data.message : 'Faild to connect to database',
         err
      );
   }
};

/**
 *
 * @param {*} item
 * @returns
 */
// export const updateItemsOrder = ()

export const addItem = item => async (dispatch, getState) => {
   try {
      // const items = getState.item.items
      item.order = getState().item.items.length;
      console.log(getState().item.items.length);

      const res = await axios.post('/api/items', item, tokenConfig(getState, dispatch));

      dispatch({
         type: actionTypes.ADD_ITEM,
         payload: res.data,
      });
      // dispatchd(clearErrors())
      return true;
   } catch (err) {
      dispatch(
         returnErrors(
            err.response ? err.response.data.msg : 'faild to connect to databse',
            err.response ? err.response.status : '500',
            'ADD_ITEM_ERROR'
         )
      );
      return false;
   }
};

export const deleteItem = _id => async (dispatch, getState) => {
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

export const itemDndReOrder = (_id, srcI, desI) => async (dispatch, getState) => {
   try {
      const res = await axios.put(
         `/api/items/dndreorder/${ _id }?srcI=${ srcI }&desI=${ desI }`
         ,tokenConfig(getState, dispatch)
      );
      console.log(`updated ${ _id }`);
      // dispatch({
      //    type: actionTypes.REORDER_ITEMS,
      //    payload: { _id, srcI, desI },
      // });
      
   } catch (e) {
      // dispatch({
      //    type: actionTypes.GET_ERRORS,
      //    payload: e.response.data,
      // });
      returnErrors(
         e.response ? e.response.data.msg : 'faild to connect to databse',
         e.response ? e.response.status : '500',
         'REORDER_ITEMS'
      );
      //console.log('Error dispatching REORDER_ITEMS: ', e.response.data.message, e);
   }
};


export const itemDndReArrange = ({item0,item1}) => async (dispatch, getState) => {
   try {
      // console.log(item0._id)
      dispatch({
         type: actionTypes.REORDER_ITEMS,
         payload: {
            item0: { _id: item0._id, srcI: item0.srcI, desI: item0.desI },
            item1: { _id: item1._id, srcI: item1.srcI, desI: item1.desI },
         },
      });
      getState().item.items.map(async (item, i) => {
         
         await axios.put(
            `/api/items/dndreorder/${item._id}?srcI=${null}&desI=${item.order}`,
            tokenConfig(getState, dispatch)
         );
      })
      // const res1 = await axios.put(
      //    `/api/items/dndreorder/${item1._id}?srcI=${item1.srcI}&desI=${item1.desI}`,
      //    tokenConfig(getState, dispatch)
      // );
      
      // console.log(`updated ${_id}`);
      // console.log(item0,item1)
      // dispatch(getItems())
      // console.log(getState().item.items);
   } catch (e) {
      // dispatch({
      //    type: actionTypes.GET_ERRORS,
      //    payload: e.response.data,
      // });
      returnErrors(
         e.response ? e.response.data.msg : 'faild to connect to databse',
         e.response ? e.response.status : '500',
         'REORDER_ITEMS'
      );
      //console.log('Error dispatching REORDER_ITEMS: ', e.response.data.message, e);
   }
};