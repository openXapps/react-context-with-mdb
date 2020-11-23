import React from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [state] = React.useContext(AuthContext);
  return (
    <div className="m-5">
      {state.user.firstName && state.user.lastName ? (
        <h4>Welcome back {state.user.firstName} {state.user.lastName}</h4>
      ) : (
        <h4>Welcome</h4>
      )}
      {state.signedIn ? (
        <p>You are now signed in. Please continue to use the system</p>
      ) : (
        <p>You not signed in. Please sign in to use the system</p>
      )}
    </div>
  );
};

export default Home;