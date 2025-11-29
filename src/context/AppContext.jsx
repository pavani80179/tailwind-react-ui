// src/context/AppContext.jsx
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext();

const initialState = {
  theme: "light", // only theme for now
};

function appReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useLocalStorage("appState", initialState);

  function dispatch(action) {
    setState((prev) => appReducer(prev, action));
  }

  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
