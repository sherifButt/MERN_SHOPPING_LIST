import axios from 'axios';
import { clearErrors, returnErrors } from '../actions/errorActions';
import actionTypes from '../constants/actionTypes';

// check tocken and load user
export const loadUser = () => async (dispatch, getState) => {
   // User loading
   // dispatch({ type: actionTypes.USER_LOADING });

   // get token from localStorage
   // const token = getState().auth.token;

   // headers
   // const config = {
   //    headers: { 'Content-Type': 'application/json' },
   // };

   // if (!token) {
   //    dispatch(returnErrors('Token not found', 401 ));
   //    dispatch({ type: actionTypes.AUTH_ERROR });
   //    return;}

   try {
      // if token add to headers
      // if (token) {
      // config.headers['x-auth-token'] = token;
      // }

      const response = await axios.get(`/api/auth/user/`, tokenConfig(getState, dispatch));

      const user = response.data.user;

      dispatch({
         type: actionTypes.USER_LOADED,
         payload: user,
      });
   } catch (err) {
      dispatch(returnErrors(err.response.data.msg, err.response.data.status, 'LOGIN_FAIL'));
      dispatch({ type: actionTypes.LOGIN_FAIL });
      if (!process.env.NODE_ENV === 'production')
         console.log('Error dispatching LoadUser: ', err.response, err);
   }
};

// Register User
export const register = user => async dispatch => {
   // headers
   // const config = {
   //    headers: {
   //       "Content-type": "application/json"
   //    }
   // }
   try {
      const response = await axios.post(`/api/users/`, user);
      const token = response.data.token;
      const regesterdUser = response.data.user;

      if (token)
         dispatch({ type: actionTypes.REGEITER_SUCCESS, payload: { token, user: regesterdUser } });
   } catch (err) {
      console.log('Error dispatching RegisterUser: ', err.response);
      dispatch(returnErrors(err.response.data.msg, err.response.data.status, 'REGISTER_FAIL'));
      dispatch({ type: actionTypes.REGISTER_FAIL });
   }
};

// log user out
export const logout = () => {
   return {
      type: actionTypes.LOGOUT_SUCCESS,
   };
};

// login
export const login = user => async dispatch => {
   // check if user exists
   try {
      const response = await axios.post('/api/auth ', user);
      const token = response.data.token;
      if (!token) throw Error(`No token found for ${user.email}`);

      const existingUser = response.data.user;
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { user: existingUser, token: token } });
      dispatch(clearErrors);
   } catch (err) {
      console.log('Error dispatching login: ' + err.response.data.msg, err.response.data.status);
      dispatch(returnErrors(err.response.data.msg, err.response.data.status, 'LOGIN_FAIL'));
   }
};

export const registerToggle = () => {

   return {
      type: actionTypes.REGISTER_TOGGLE,
   };
}
export const loginToggle = () => {

   return {
      type: actionTypes.LOGIN_TOGGLE,
   };
}

export const tokenConfig = (getState, dispatch) => {
   const token = getState().auth.token;

   if (!token) {
      dispatch(returnErrors('Token not found', 401, 'AUTH_ERROR'));
      dispatch({ type: actionTypes.AUTH_ERROR });
      return null;
   }
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   };
   if (token) config.headers['x-auth-token'] = token;
   return config;
};
