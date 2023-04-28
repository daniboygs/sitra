import React, { useState } from "react";
import { useEffect } from "react";

import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from "baseui/typography";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

class Login extends React.Component{

  constructor(props){
      super(props);
      this.state={
          pathname: '/'
      }
      this.onClick = this.onClick.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

//function Login(props) {
  //const [error, setError] = useState("");
   signIn = useSignIn();

   onSubmit = async (values) => {
    console.log("Values: ", values);
    //setError("");

    /*try {
      const base_api_url = 'http://172.16.2.27:8080/GASD951006/sitra-api/';

      export function getCarpets(request){
          return axios.post(base_api_url + 'carpeta.php', request);
      }

      const response = await axios.post(
        "http://localhost:9000/api/v1/login",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }*/
  };

   /*formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });*/

  render() {
  return (
    <Container>
      {/*<InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Welcome Back!</HeadingXXLarge>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              clearOnEscape
              size="large"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
          </InputWrapper>
        </form>
  </InnerContainer>*/}
    </Container>
  );
  }
}

export { Login };





/*function Login2({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation()
  const {isLoginLoading, hasLoginError, login, isLogged} = useUser()

  useEffect(() => {
    if (isLogged) {
      navigate('/')
      onLogin && onLogin()
    }
  }, [isLogged, navigate, onLogin])

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password })
  };

  return (
    <>
      {isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLoginLoading &&
        <form className='form' onSubmit={handleSubmit}>
          <label>
            username
            <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          </label>

          <label>
            password
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <button className='btn'>Login</button>
        </form>
      }
      {
        hasLoginError && <strong>Credentials are invalid</strong>
      }
    </>
  );
}*/


//export {Login};