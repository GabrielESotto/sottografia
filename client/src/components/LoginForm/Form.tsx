/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ChangeEvent, useContext, useEffect } from "react";

import "./Form.css";
import LoginContext from "../../contexts/LoginContext";
import Snackbars, { State } from "../Snackbar/Snackbar";
import { SnackbarOrigin } from "@mui/material";

const Form: React.FC = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    message,
    handleSubmit,
  } = useContext(LoginContext);

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  return (
    <div className="login-container">
      <Snackbars message={message} state={state} setState={setState} />
      <div className="centralize-form">
        <div className="container-form">
          <h1 className="title-admin">Admin Access</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="wrap-input">
              <label className="label-admin">Login</label>
              <input
                className="input-admin"
                type="text"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="wrap-input">
              <label className="label-admin">Senha</label>
              <input
                className="input-admin"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="btn-login"
              onClick={handleClick({
                vertical: "bottom",
                horizontal: "right",
              })}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
