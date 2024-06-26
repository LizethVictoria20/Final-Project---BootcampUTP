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
      isRegistered: true,
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

  return (
    <UserContext.Provider value={{ authState, login, register }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthProvider;
