/**
 * Authentication Reducer component
 * @param {Object} state - Reducer current state
 * @param {string} type - Reducer action type
 * @param {Object} payload - Reducer payload
 * @returns {Object} New state
 */
const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        signedIn: true
      };
    case 'LOGOUT':
      return {
        ...state,
        token: payload.token,
        signedIn: false
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;