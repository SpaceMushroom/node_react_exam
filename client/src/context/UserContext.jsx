import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../routes/const";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => null,
  handleLogout: () => null,
  handleRegister: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("usser")));
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const handleLogin = (user) => {
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(PROFILE_ROUTE);
    } else {
      setUser(null);
      navigate(LOGIN_ROUTE);
    }
  };

  const handleRegister = (data) => {
    if (data) {
      navigate(LOGIN_ROUTE);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
