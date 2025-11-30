// src/context/AppContext.jsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const AppContext = createContext();

const initialState = {
  theme: "dark", // default when app first loads
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  // load saved theme from localStorage once
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (defaultState) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
          return { ...defaultState, theme: saved };
        }
      }
      return defaultState;
    }
  );

  // whenever theme changes, update <html class="dark"> and store it
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
