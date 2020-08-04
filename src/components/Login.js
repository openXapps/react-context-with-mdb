import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { AuthContext } from '../context/AuthContext';

const arServer = {
  // url: 'http://ditsmapp1.standardbank.co.za:8008/api/jwt/login'
  url: 'http://uitsmlbweb.standardbank.co.za/api/jwt/login'
  // url: 'http://localhost/api/jwt/login'
};

const authDetailsDefault = {
  username: 'gavin.dalton@standardbank.co.za',
  password: '',
  authorized: false,
  validInput: 'UNSET'
};

const Login = () => {
  const [state, dispatch] = React.useContext(AuthContext);
  const [authDetails, setAuthDetails] = React.useState(authDetailsDefault);
  const history = useHistory();

  const onLogin = (e) => {
    let isFormValid = true;
    e.preventDefault();
    if (!authDetails.username || !authDetails.password) {
      isFormValid = false
      // setAuthDetails({ ...authDetails, validInput: 'INVALID' });
    };
    if (isFormValid) {
      fetch(arServer.url, {
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'no-cors'
        // body: encodeURI(`username=${authDetails.username}&password=${authDetails.password}&authString=authenticationstring`)
        // body: `username=${authDetails.username}&password=${authDetails.password}&authString=authenticationstring`
      }).then((response) => {
        console.log('Login: response...', response);
        return response.text();
      }).then((token) => {
        console.log('Login: token... ', token);
        dispatch({
          type: 'LOGIN', payload: {
            username: authDetails.username,
            token: token
          }
        });
        // history.goBack();
      }).catch((err) => {
        console.log('Login: auth.err...', err);
      });
    };
  };

  const onChange = (e) => {
    // console.log('Login: onChange event name...', [e.target.name]);
    // console.log('Login: onChange event value...', [e.target.value]);
    // console.log('Login: authDetails.validInput...', authDetails.validInput);
    // if (authDetails.validInput.valueOf() === 'INVALID') {
    //   setAuthDetails({ ...authDetails, validInput: 'UNSET' });
    // };
    setAuthDetails({ ...authDetails, [e.target.name]: e.target.value, validInput: 'UNSET' });
  };

  return (
    <MDBContainer>
      <div className="my-5 mx-auto" style={{ maxWidth: 450 }}>
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-3">
                    <strong>Sign in</strong>
                  </h3>
                  {authDetails.validInput === 'INVALID' ? (
                    <p className="text-danger">Please enter valid information!</p>
                  ) : (null)}
                </div>
                <form
                  onSubmit={onLogin}
                  autoComplete="off"
                >
                  <div className="grey-text">
                    <MDBInput
                      value={authDetails.username}
                      name="username"
                      onChange={onChange}
                      type="text"
                      label="Your user name"
                      icon="user"
                    />
                    <MDBInput
                      value={authDetails.password}
                      name="password"
                      onChange={onChange}
                      label="Your password"
                      type="password"
                      icon="lock"
                    />
                  </div>
                  <div className="text-center mb-3">
                    <MDBBtn
                      className="btn-block z-depth-1"
                      type="submit"
                      gradient="blue"
                    >Sign in</MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default Login;