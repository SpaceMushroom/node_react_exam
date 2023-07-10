import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../context/UserContext";
import "./Counter.scss";

const Counter = ({ answer }) => {
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(answer.count);

  const updateCount = async (id, newCount) => {
    try {
      const response = await fetch(
        `http://localhost:3000/answers/${id}/count`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ count: newCount }),
        }
      );

      if (response.ok) {
        setCount(newCount);
      } else {
        throw new Error("Failed to update count");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const increaseCount = async () => {
    const newCount = count + 1;
    await updateCount(answer._id, newCount);
  };

  const decreaseCount = async () => {
    const newCount = count - 1;
    await updateCount(answer._id, newCount);
  };

  return (
    <div className="counter">
      <button onClick={user ? increaseCount : () => {}}>+</button>
      <span>{count}</span>
      <button onClick={user ? decreaseCount : () => {}}>-</button>
    </div>
  );
};

export default Counter;

Counter.protoTypes = {
  id: PropTypes.object,
};
