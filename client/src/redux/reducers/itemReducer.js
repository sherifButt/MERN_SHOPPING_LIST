import actionTypes from '../constants/actionTypes';

const initialState = {
   items: [],
   loading: actionTypes.ITEMS_LOADING,
   count: 0,
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
            items: state.items.filter(item => item._id !== payload),
         };
      }
      case actionTypes.ITEMS_LOADING:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.REORDER_ITEMS:
         const { item0,item1 } = payload;

         // state.items[item0.srcI].order = item0.desI;
         // state.items[item1.srcI].order = item1.desI;
         //  console.log(state.items[item0.srcI],state.items[item1.srcI]);
         console.log(payload.item0.srcI, payload.item0.desI);
         console.log(payload.item1.desI, payload.item1.srcI);
         let _items = state.items
         state.items.splice(payload.item0.desI, 0, state.items.splice(payload.item0.srcI, 1)[0]);
         state.items.map((item, i) => {
            item.order = i
         })
         // state.items.sort((a, b) => b.order - a.order);

         // console.log('.......>', state.items[srcI]);
         return {
            ...state,
            items:[...state.items]
         };
      default:
         return state;
   }
};

export default itemReducer;
