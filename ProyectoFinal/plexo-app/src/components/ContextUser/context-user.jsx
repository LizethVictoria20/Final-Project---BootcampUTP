import { createContext, useState } from "react";

export const UserContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isRegistered: false,
    user: null,
    isAdmin: false,
  });

  const login = (user, isAdmin) => {
    setAuthState({
      isAuthenticated: true,
      isRegistered: false,
      user,
      isAdmin,
    });
  };

  const register = (isAdmin) => {
    setAuthState({
      isAuthenticated: true,
      isRegistered: true,
      isAdmin,
    });
  };
  const logout = (isAdmin) => {
    setAuthState({
      isAuthenticated: false,
      isRegistered: false,
      isAdmin: false,
    });
  };

  return (
    <UserContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthProvider;
