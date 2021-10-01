import actionTypes from '../constants/actionTypes';
import axios from 'axios';
import { returnErrors } from '../actions/errorActions';

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

      const user = await axios.get(`/api/auth/user/`, tokenConfig(getState));

      dispatch({
         type: actionTypes.USER_LOADED,
         payload: user,
      });
   } catch (err) {
      // dispatch(returnErrors(err.response.data.msg, err.response.status, err.response.data.id));
      dispatch({ type: actionTypes.AUTH_ERROR });
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
      dispatch(returnErrors(err.response.data.msg, err.response.data.status,'REGISTER_FAIL'));
      dispatch({ type: actionTypes.REGISTER_FAIL });
   }
};

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
