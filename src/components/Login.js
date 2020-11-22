import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { AuthContext } from '../context/AuthContext';
import { createCookie } from '../utils/cookies'

const authDetailsInit = {
  email: '',
  password: ''
};

// *** need to fix the state and flow of this component ***

const Login = () => {
  const [state, dispatch] = React.useContext(AuthContext);
  const [authDetails, setAuthDetails] = React.useState(authDetailsInit);
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    if (authDetails.email && authDetails.password) {
      setTimeout(() => {
        createCookie('first_name', 'John', 'm', 60);
        createCookie('last_name', 'Smith', 'm', 60);
        createCookie('email', authDetails.email, 'm', 60);
        dispatch({
          type: 'LOGIN', payload: {
            user: { ...state.user, firstName: 'John', lastName: 'Smith', email: authDetails.email },
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyWFwvM2RrQVpZQmk0WkR6RlYx'
          }
        });
        history.goBack();
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
                      value={authDetails.username}
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