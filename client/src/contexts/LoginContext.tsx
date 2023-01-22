/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { createContext, useState, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import AuthContext from "./AuthContext";

interface LoginContextType {
  username: string;
  password: string;
  message: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  navigateToLoggedPage?: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

interface LoginContextProps {
  children?: ReactNode | undefined;
}

const LoginContext = createContext({} as LoginContextType);

export const LoginProvider = ({ children }: LoginContextProps) => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const navigateToLoggedPage = () => {
    navigate("/logged/admin");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    (async () => {
      await axios
        .post("http://localhost:3001/users/login", {
          username,
          password,
        })
        .then((res) => {
          login(res.data);
          navigateToLoggedPage();
          setMessage("Login realizado com sucesso");
        })
        .catch((error) => {
          setMessage(error.response.data);
        });
    })();
  };

  return (
    <LoginContext.Provider
      value={{
        handleSubmit,
        message,
        username,
        password,
        setUsername,
        setPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
