import { actionTypes } from "../constants/actionTypes";

export const getItems = () => {
   return {
      type: actionTypes.GET_ITEMS,
   };
};

export const addItem = (name) => {
   return {
      type: actionTypes.ADD_ITEM,
      payload: name,
   };
};

export const deleteItem = (id) => {
   return {
      type: actionTypes.DELETE_ITEM,
      payload: id,
   };
};
