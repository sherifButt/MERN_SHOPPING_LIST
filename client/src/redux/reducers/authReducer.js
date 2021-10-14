import actionTypes from '../constants/actionTypes';

const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   isLoading: false,
   user: { id: null },
   isLoginOpen: false,
   isRegisterOpen:false,
};

const authReducer =  (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.USER_LOADING:
         return {
            ...state,
            isLoading: true,
         };
      case actionTypes.USER_LOADED:
         return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: payload,
         };
      case actionTypes.LOGIN_SUCCESS:
      case actionTypes.REGEITER_SUCCESS:
         localStorage.setItem('token', payload.token);
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            isLoading: false,
         };
      case actionTypes.AUTH_ERROR:
      case actionTypes.LOGIN_FAIL:
      case actionTypes.LOGOUT_SUCCESS:
      case actionTypes.REGISTER_FAIL:
         localStorage.removeItem('token');
         return {
            ...state,
            token: null,
            user: { id: null },
            isAuthenticated: false,
            isLoading: false,
         };
      case actionTypes.LOGIN_TOGGLE:
         return {
            ...state,
            isLoginOpen: !state.isLoginOpen,
         };
      case actionTypes.REGISTER_TOGGLE:
         return {
            ...state,
            isLoginOpen: !state.isRegisterOpen,
         };
      default:
         return state;
   }
};

export default authReducer