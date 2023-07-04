import "./Layout.css";
import Header from "../components/Header/Header";

const LoginLayout = ({ children }) => {
  return (
    <div className="login-container">
      <Header />
      <h1>Hello to my app!</h1>
      {children}
    </div>
  );
};

export default LoginLayout;
