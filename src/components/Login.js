import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { AuthContext } from '../context/AuthContext';

const authDetailsDefault = {
  username: '',
  password: '',
};

const Login = () => {
  const [state, dispatch] = React.useContext(AuthContext);
  const [authDetails, setAuthDetails] = React.useState(authDetailsDefault);
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    if (authDetails.username && authDetails.password) {
      setTimeout(() => {
        dispatch({
          type: 'LOGIN', payload: {
            user: authDetails,
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyWFwvM2RrQVpZQmk0WkR6RlYx',
            server: 'hrsystem.mycompany.com'
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