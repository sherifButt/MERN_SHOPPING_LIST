import { actionTypes } from "../constants/actionTypes";

const initialState = {
   items: [],
   loading: actionTypes.ITEMS_LOADING,
};

const itemReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.GET_ITEMS:
         return {
            ...state,
            items: payload,
            loading: false,
         };
      case actionTypes.ADD_ITEM:
         return payload
            ? {
                 ...state,
                 items: [payload, ...state.items],
              }
            : { ...state };
      case actionTypes.DELETE_ITEM: {
         return {
            ...state,
            items: state.items.filter(item => item.id !== payload),
         };
      }
      case actionTypes.ITEMS_LOADING:
         return {
            ...state,
            loading: true,
         };
      default:
         return state;
   }
};

export default itemReducer;
