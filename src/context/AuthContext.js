import React from 'react';
import AuthReducer from './AuthReducer';
import { validateCookie, getCookie } from '../utils/cookies';

/**
 * Return stored data from browser
 * @param {string} key - Key to return value for
 * @returns {string}
 */
const getValue = key => {
  let value = '';
  if (validateCookie(key)) {
    value = getCookie(key);
  }
  return value;
};

/**
 * Helper function to fetch initial
 * state from browser cookies
 */
const getUserDetails = () => {
  const userDetails = {
    email: getValue('email'),
    firstName: getValue('first_name'),
    lastName: getValue('last_name')
  };
  return userDetails;
};

/**
 * Initial context state
 */
const initialState = {
  user: getUserDetails(),
  token: '',
  signedIn: false
};

export const AuthContext = React.createContext('');

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]} >
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;