import { useContext } from "react";

import { UserContext } from "../../context/UserContext";

const NewQuestion = () => {
  const { handleLogin } = useContext(UserContext);
  console.log(handleLogin("admin", "admin"));
  return <div>NewQuestion</div>;
};

export default NewQuestion;
