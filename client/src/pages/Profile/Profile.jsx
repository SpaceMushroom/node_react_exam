import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import "./Profile.scss";

const Profile = () => {
  const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    handleLogout();
    navigate("/");
  };
  console.log(user);

  return (
    <div className="main">
      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default Profile;
