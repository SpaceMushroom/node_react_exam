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

import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { isLoggedIn, user } = useContext(UserContext);

  return (
    <nav className="navigation">
      <div>
        <Link to={MAIN_ROUTE}>
          <div>logo</div>
        </Link>
      </div>
      <nav className="navigation-items">
        <Link to={MAIN_ROUTE}>Main</Link>
        <Link to={QUESTIONS_ROUTE}>Questions</Link>
        {isLoggedIn ? (
          <>
            <Link to={NEW_QUESTION_ROUTE}>New question</Link>
            <Link to={PROFILE_ROUTE} className="user-container">
              <FaUserCircle />
              {user.username}
            </Link>
          </>
        ) : (
          <>
            <Link to={LOGIN_ROUTE}>
              <div>Login</div>
            </Link>
            <Link to={REGISTER_ROUTE}>
              <div>Register</div>
            </Link>
          </>
        )}
      </nav>
    </nav>
  );
};

export default Header;
