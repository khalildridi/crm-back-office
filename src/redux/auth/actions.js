import * as actionTypes from './types';
import * as authService from '@/auth';
import { request } from '@/request';

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.login({ loginData });

    if (data.success === true) {
      
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        access_token: data.access_token,
      };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
        window.localStorage.removeItem('isLogout');
      
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
        access_token:data.access_token
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const register =
  ({ registerData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.register({ registerData });

    if (data.success === true) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const verify =
  ({ userId, emailToken }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.verify({ userId, emailToken });

    if (data.success === true) {
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        access_token: data.access_token,
      };

      window.localStorage.setItem('auth', JSON.stringify(auth_state));
      window.localStorage.removeItem('isLogout');
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
        access_token: data.access_token,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const resetPassword =
  ({ resetPasswordData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.resetPassword({ resetPasswordData });

    if (data.success === true) {
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        access_token: data.access_token,
      };
      window.localStorage.setItem('auth', JSON.stringify(auth_state));
      window.localStorage.removeItem('isLogout');
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
        access_token: data.access_token,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_LOADING,
  });

  // const auth = window.localStorage.getItem('auth');
  // const tmpAuth = auth ? JSON.parse(auth) : null;
  // const settings = window.localStorage.getItem('settings');
  // const tmpSettings = settings ? JSON.parse(settings) : null;

  window.localStorage.setItem('isLogout', JSON.stringify({ isLogout: true }));

  // Appel à l'API de déconnexion
  const data = await authService.logout();

  if (data.success === false) {
    // Si la déconnexion échoue, restaurer l'état initial
    window.localStorage.removeItem('isLogout');
    dispatch({
      type: actionTypes.LOGOUT_FAILED,
      payload: data.result,
    });
  } else {
    // Suppression des informations de l'utilisateur après la déconnexion réussie
     dispatch({
       type: actionTypes.LOGOUT_SUCCESS,
     });
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('settings');
    // window.localStorage.removeItem('isLogout');

   
  }
};

export const updateProfile =
  ({ entity, jsonData }) =>
  async (dispatch) => {
    let data = await request.updateAndUpload({ entity, id: '', jsonData });

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
        access_token: data.access_token,
      });
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        access_token: data.access_token,
      };
      window.localStorage.setItem('auth', JSON.stringify(auth_state));
    }
  };
