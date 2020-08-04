import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const arServer = {
  // url: 'http://ditsmapp1.standardbank.co.za:8008/api/jwt/logout'
  url: 'http://uitsmlbweb.standardbank.co.za/api/jwt/login'
  // url: 'http://localhost/api/jwt/logout'
};

const Logout = () => {
  const [state, dispatch] = React.useContext(AuthContext);
  const history = useHistory();

  React.useEffect(() => {
    // console.log('Logout: history....', history);
    setTimeout(() => {
      if (state.token) {
        fetch(arServer.url, {
          method: 'POST',
          headers: {
            'Authorization': 'AR-JWT ' + state.token
          }
        }).then((response) => {
          console.log('Logout: response...', response);
        }).catch((err) => {
          console.log(err);
        });
      }
      dispatch({ type: 'LOGOUT', payload: '' });
      // history.goBack();
    }, 1000);
    return () => { };
  }, [dispatch, state.token]);

  return (
    <div>
      Logout
      {state.signedIn ? (
        <div>
          <h4>Signing out...</h4>
          <p>Token ID</p>
          <p>{state.token}</p>
        </div>
      ) : (
          <div>
            <p>Signed out!</p>
          </div>
        )}
    </div>
  );
};

export default Logout;