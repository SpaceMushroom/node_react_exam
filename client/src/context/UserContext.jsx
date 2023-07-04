import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => null,
  handleLogout: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // null | {email: "test", password: "asd123"}
  const isLoggedIn = !!user; // null | {email: "test", password: "asd123"

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", true); //cia pakeisti i user objekta kai veiks loginas
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
