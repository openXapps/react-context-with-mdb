export const initialState = {
  user: {},
  token: '',
  signedIn: false,
  server: ''
}

const AuthReducer = (state, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        signedIn: true,
        server: payload.server
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
        token: '',
        signedIn: false,
        server: ''
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;