import React from 'react';
import AuthReducer, { initialState } from './AuthReducer';

export const AuthContext = React.createContext('');

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;