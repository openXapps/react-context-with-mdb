export const initialState = {
  username: '',
  token: '',
  signedIn: false
}

const AuthReducer = (state, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        username: payload.username,
        token: payload.token,
        signedIn: true
      };
    case 'LOGOUT':
      return {
        ...state,
        username: '',
        token: '',
        signedIn: false
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;