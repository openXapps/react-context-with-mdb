import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const [, dispatch] = React.useContext(AuthContext);
  const history = useHistory();

  React.useEffect(() => {
    // console.log('Logout: history....', history);
    setTimeout(() => {
      dispatch({ type: 'LOGOUT', payload: {} });
      history.goBack();
    }, 1000);
    return () => { };
  }, [dispatch, history]);

  return (
    <div className="m-5">
      <h4>Signing out...</h4>
    </div>
  );
};

export default Logout;