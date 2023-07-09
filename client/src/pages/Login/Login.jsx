import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { REGISTER_ROUTE } from "../../routes/const";
import Button from "../../components/Button/Button";
import "./Login.scss";

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
    <div className="main">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.password)}
            ref={passwordRef}
            required
          />
        </div>

        {message && <p className="error">{message}</p>}
        <Button>Login</Button>
        <Link to={REGISTER_ROUTE}>
          <Button variant={"outlined"}>Register</Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
