import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, postRequest } from "../utils/services";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect( () => {
    const user = localStorage.getItem("user")

    setUser(JSON.parse(user))
  }, [])

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info)
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info)
  }, []);

  const logoutUser = useCallback( () => {
    localStorage.removeItem('user')
    setUser(null)
  }, [])
  
  const registerUser = useCallback(async (e) => {
    e.preventDefault()

    setIsRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `${baseurl}/users/register`,
      JSON.stringify(registerInfo)
    );

    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }

    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);
  
  const loginUser = useCallback( async (e) => {
    e.preventDefault()

    setIsLoginLoading(true)
    setLoginError(null)

    const response = await postRequest(
      `${baseurl}/users/login`,
      JSON.stringify(loginInfo)
    );

    setIsLoginLoading(false)

    if (response.error) {
      return setLoginError(response);
    }

    localStorage.setItem("user", JSON.stringify(response))
    setUser(response)

  }, [loginInfo])

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        updateLoginInfo,
        loginError,
        isLoginLoading,
        loginInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
