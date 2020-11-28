import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { AuthContext } from '../context/AuthContext';
import { createCookie } from '../utils/cookies'

const initAuthDetails = {
  email: 'john.smith@domain.com',
  password: 'password'
};

const Login = () => {
  const [state, dispatch] = React.useContext(AuthContext);
  const [authDetails, setAuthDetails] = React.useState(initAuthDetails);
  const history = useHistory();

  const onLogin = (e) => {
    let result = false;
    const cookieTimeout = 30;
    e.preventDefault();
    if (authDetails.email && authDetails.password) {
      setTimeout(() => {
        result = createCookie('first_name', 'John', 'd', cookieTimeout);
        result = createCookie('last_name', 'Smith', 'd', cookieTimeout);
        result = createCookie('email', authDetails.email, 'd', cookieTimeout);
        if (result) {
          dispatch({
            type: 'LOGIN', payload: {
              user: { email: authDetails.email, firstName: 'John', lastName: 'Smith' },
              token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyWFwvM2RrQVpZQmk0WkR6RlYx'
            }
          });
          history.goBack();
        }
      }, 1000);
    };
  };

  const onChange = (e) => {
    // Note the cool dynamic member assignment
    setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });
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
                  {state.user.firstName ? (
                    <h4>{state.user.firstName}</h4>
                  ) : (null)}
                </div>
                <form
                  onSubmit={onLogin}
                  autoComplete="off"
                >
                  <div className="grey-text">
                    <MDBInput
                      value={authDetails.email}
                      name="email"
                      onChange={onChange}
                      type="email"
                      label="Your email address"
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