import React from 'react';
import {
  MDBBox
} from 'mdbreact';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const [state] = React.useContext(AuthContext);
  return (
    <MDBBox className="fixed-bottom unique-color text-white p-1">
      <div>Connected to: {state.server}</div>
    </MDBBox>
  );
};

export default Footer;