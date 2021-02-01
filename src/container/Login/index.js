import React, { useState } from "react";

import { NavLink, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { signIn, signInWithProvider } from '../../Auth/auth';

import FacebookIcon from "@material-ui/icons/Facebook";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Login = React.memo((props) => {
  const auth = useSelector(state => state.auth_user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleChangeEmail = e => {
    setEmail(e.target.value)
  }
  const handleChangePassword = e => {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(signIn(user));
  };
  if (auth.isSignedInWithProvider || auth.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  const handleSignIn = () => {
    dispatch(signInWithProvider());
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2">
      {/* form */}
      <div className="flex flex-col items-center border p-8 w-1/4 bg-white">
        <span
          style={{ fontFamily: "Satisfy, cursive" }}
          className="text-3xl font-bold font-cursive text-center mt-4 mb-12"
        >
          homeCoffee
        </span>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            value={email}
            onChange={handleChangeEmail}
            className="text-lg bg-transparent mb-4 p-2 border-b w-full focus:outline-none"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <br />
          <input
            value={password}
            onChange={handleChangePassword}
            className="text-lg bg-transparent mb-4 p-2 border-b w-full focus:outline-none"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
            <AwesomeButton block onPress={handleSubmit} type="primary" className="w-full">
              Log in
            </AwesomeButton>
        </form>
        <span className="mt-4 text-gray-500">OR</span>
        <AwesomeButton onPress={handleSignIn} type="link">
          <FacebookIcon /> Sign in with Facebook
        </AwesomeButton>
      </div>
      <div className="border-2 w-1/4 p-8 text-center bg-white">
        <span className="text-gray-500 mb-8">
          Don't have an account?{" "}
          <NavLink to="/register">
            <button className="focus:outline-none text-blue-500">
              Sign up
            </button>
          </NavLink>
        </span>
      </div>
    </div>
  );
});

export default Login;
