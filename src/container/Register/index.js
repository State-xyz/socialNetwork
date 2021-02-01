import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { signUp, signInWithProvider } from "../../Auth/auth";

import { NavLink, Redirect } from "react-router-dom";

import FacebookIcon from "@material-ui/icons/Facebook";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Register = React.memo((props) => {
  const auth = useSelector((state) => state.auth_user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    dispatch(signUp(user));
  };
  if (auth.isSignedInWithProvider) {
    return <Redirect to="/dashboard" />;
  }
  const handleSignIn = () => {
    dispatch(signInWithProvider());
  };
  if (auth.isSignedUp) {
    return <Redirect to="/" />;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2">
      {/* form */}
      <div className="flex flex-col items-center border-2 p-8 w-1/4 bg-white">
        <span
          style={{ fontFamily: "Satisfy, cursive" }}
          className="text-3xl font-bold font-cursive text-center mt-4 mb-8"
        >
          homeCoffee
        </span>
        <span className="mb-2 text-center text-xl text-gray-400">
          Sign up to see photos and videos from your friends.
        </span>
        <AwesomeButton
          element="button"
          ripple={true}
          onPress={handleSignIn}
          type="link"
        >
          <FacebookIcon /> Sign in with Facebook
        </AwesomeButton>
        <span className="mt-2 text-gray-500">OR</span>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            onChange={handleChangeName}
            className="text-lg bg-transparent mb-2 p-2 border-b-2 w-full focus:outline-none"
            value={name}
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <br />
          <input
            onChange={handleChangeEmail}
            className="text-lg bg-transparent mb-2 p-2 border-b-2 w-full focus:outline-none"
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <br />
          <input
            onChange={handleChangePassword}
            className="text-lg bg-transparent mb-4 p-2 border-b-2 w-full focus:outline-none"
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <AwesomeButton
            block
            onPress={handleSubmit}
            ripple={true}
            type="primary"
            className="w-full"
          >
            Sign up
          </AwesomeButton>
        </form>
        <span className="mt-2 text-gray-400 text-center">
          By signing up, you agree to our <strong>Terms</strong> ,{" "}
          <strong>Data Policy</strong>
          and <strong>Cookies Policy</strong>.
        </span>
      </div>
      <div className="border-2 w-1/4 p-8 text-center bg-white">
        <span className="text-gray-500 mb-8">
          Have an account?{" "}
          <NavLink to="/">
            <button className="focus:outline-none text-blue-500">Log in</button>
          </NavLink>
        </span>
      </div>
    </div>
  );
});

export default Register;
