import React, { createContext, useReducer } from "react";
import fileReducer from "./fileReducer";

import bcrypt from "bcryptjs";

const initialState = {
  userData: null,
  isLogin: false,
  account: [
    {
      
      id: 1,
      balance: 80,
      listOrder: [],
    },
    {
      
      id: 2,
      balance: 100,
      listOrder: [],
    },
  ],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);


  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const setUserData = (data) => {
    dispatch({ type: "SET_USER_DATA", payload: data });
  };

  const onLogin = () => {
    dispatch({ type: "LOGIN" });
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogin: state.isLogin,
        account: state.account,
        userData: state.userData,
        onLogout,
        setUserData,
        onLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
