import React, { createContext, useReducer } from "react";
import fileReducer from "./fileReducer";

const initialState = {
  userData: null,
  isLogin: false,
  account: [
        {
          email: "john@gmail.com",
          password: "john",
          name: "John",
          balance: 20000,
          listOrder: [],
          listTrade: [],
        },
        {
          email: "rose@gmail.com",
          password: "rose",
          name: "Rose",
          balance: 40000,
          listOrder: [],
          listTrade: [],
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
