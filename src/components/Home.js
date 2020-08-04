import React from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [state] = React.useContext(AuthContext);
  return (
    <div className="m-5">
      <h4>Welcome</h4>
      {state.signedIn ? (
        <p>You signed in. Continue to use the HR system</p>
      ) : (
        <p>You not signed in. Please sign in to use the HR system</p>
      )}
    </div>
  );
};

export default Home;