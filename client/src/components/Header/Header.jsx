import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  MAIN_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  NEW_QUESTION_ROUTE,
  PROFILE_ROUTE,
  QUESTIONS_ROUTE,
} from "../../routes/const";
import "./Header.scss";

import { FaUserCircle, FaInfo, FaGoogle } from "react-icons/fa";

const Header = () => {
  const { isLoggedIn, user } = useContext(UserContext);

  return (
    <header className="navigation">
      <div>
        <Link to={MAIN_ROUTE}>
          <div className="logo">
            <FaInfo className="info" />
            <FaGoogle className="google" />
          </div>
        </Link>
      </div>
      <nav className="navigation-items">
        <Link className="link" to={MAIN_ROUTE}>
          <div>Main</div>
        </Link>
        <Link to={QUESTIONS_ROUTE}>
          <div>Questions</div>
        </Link>
        {isLoggedIn ? (
          <div className="logged">
            <Link to={NEW_QUESTION_ROUTE}>
              <div>New question</div>
            </Link>
            <Link to={PROFILE_ROUTE} className="user-container">
              <div>
                <FaUserCircle className="user" />
                {user.username}
              </div>
            </Link>
          </div>
        ) : (
          <div className="notLogged">
            <Link to={LOGIN_ROUTE}>
              <div>Login</div>
            </Link>
            <Link to={REGISTER_ROUTE}>
              <div>Register</div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
