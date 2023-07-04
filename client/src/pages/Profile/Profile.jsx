import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    handleLogout();
    navigate("/");
  };
  console.log(user);

  return (
    <div>
      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Profile;
