import React from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBLink,
  MDBIcon
} from 'mdbreact';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [state] = React.useContext(AuthContext);

  // const onNavToggle = () => {
  //   setNavState(!navState);
  // };

  return (
    <MDBNavbar color="unique-color" dark>
      <MDBNavbarBrand>
        <strong className="white-text">Remedy API Test</strong>
      </MDBNavbarBrand>
      <MDBNavbarNav left>
        <MDBNavItem>
          <MDBLink to="/">Home</MDBLink>
        </MDBNavItem>
      </MDBNavbarNav>
      <MDBNavbarNav right>
        <MDBNavItem>
          {state.signedIn ? (
            <MDBLink to="/logout" link>Logout <MDBIcon icon="user" className="ml-1" /></MDBLink>
          ) : (
              <MDBLink to="/login" link>Login <MDBIcon icon="user" className="ml-1" /></MDBLink>
            )}
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};

export default Header;