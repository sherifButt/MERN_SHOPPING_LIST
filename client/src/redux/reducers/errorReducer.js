import actionTypes from '../constants/actionTypes';

const initialState = {
   msg: '',
   status: null,
   id: null,
};

const errorReducer =  (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.GET_ERRORS:
         return {
            msg: payload.msg,
            status: payload.status,
            id: payload.id,
         };

      case actionTypes.CLEAR_ERRORS:
         return {
            msg: '',
            status: null,
            id: null,
         };

      default:
         return state;
   }
};
export default errorReducer