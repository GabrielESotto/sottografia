/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

interface Data {
  username: string | null;
  password: string | null;
}

interface AuthContextType {
  user: boolean;
  login: (data: Data) => void;
  logout: () => void;
}

interface AuthContextProps {
  children?: ReactNode | undefined;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useLocalStorage("user", false);

  const navigate = useNavigate();

  const login = async (data: Data) => {
    setUser((prevState) => !prevState);
    window.localStorage.setItem("token", JSON.stringify(data));
    setTimeout(() => {
      navigate("/logged/admin");
      window.location.reload();
    });
  };

  const logout = async () => {
    setUser((prevState) => !prevState);
    window.localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/adminpage");
      window.location.reload();
    });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
