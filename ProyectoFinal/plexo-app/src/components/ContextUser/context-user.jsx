import { createContext, useState } from "react";

export const UserContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isRegistered: false,
    user: null,
  });

  const login = (user) => {
    setAuthState({
      isAuthenticated: true,
      isRegistered: true,
      user,
    });
  };

  const register = (user) => {
    setAuthState({
      isAuthenticated: true,
      isRegistered: true,
      user,
    });
  };

  return (
    <UserContext.Provider value={{ authState, login, register }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthProvider;
