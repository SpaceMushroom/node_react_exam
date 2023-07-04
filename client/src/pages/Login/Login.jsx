import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { REGISTER_ROUTE } from "../../routes/const";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const passwordRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: passwordRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn) {
          handleLogin(data.user);
        }
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.password)}
          ref={passwordRef}
          required
        />
        {message && <p className="error">{message}</p>}
        <button>Login</button>
        <Link to={REGISTER_ROUTE}>Register</Link>
      </form>
    </div>
  );
};

export default Login;
