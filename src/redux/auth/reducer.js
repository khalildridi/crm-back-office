import * as actionTypes from './types';

const INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  access_token:null,
};

const authReducer = (state = INITIAL_STATE, action) => {
 
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
      };
    case actionTypes.REQUEST_FAILED:
      return INITIAL_STATE;

    case actionTypes.REQUEST_SUCCESS:
      console.log('action.payload is', action?.payload);
      console.log('action.access_token is', action);
      return {
        current: action.payload,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        access_token: action.access_token,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        current: null,
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        access_token: null,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    case actionTypes.LOGOUT_FAILED:
      return {
        current: action.payload,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        access_token: null,
      };

    default:
      return state;
  }
};

export default authReducer;
