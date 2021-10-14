import actionTypes from '../constants/actionTypes';

export const returnErrors = (msg, status, id = null) => dispatch => {
   dispatch(clearErrors())
   return {
      type: actionTypes.GET_ERRORS,
      payload: { msg, status, id },
   };
};

export const clearErrors = () => {
   return {
      type: actionTypes.CLEAR_ERRORS,
   };
};
