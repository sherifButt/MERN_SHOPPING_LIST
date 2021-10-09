import actionTypes from "../constants/actionTypes";
const initialState = {
   categories: [],
   loading: actionTypes.CATEGORIES_LOADING,
   count: 0
}

const categoryReducer = (state=initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.GET_CATEGORIES:
         return {
            ...state,
            categories: payload,
            loading: false,
         };
      case actionTypes.ADD_CATEGORY:
         return payload
            ? {
                 ...state,
                 categories: [payload.category, ...state.categories],
              }
            : { ...state };
      case actionTypes.DELETE_CATEGORY: {
         return {
            ...state,
            categories: state.categories.filter(category => category._id !== payload),
         };
      }
      case actionTypes.CATEGORIES_LOADING:
         return {
            ...state,
            loading: true,
         };
      default:
         return state;
   }
}

export default categoryReducer;