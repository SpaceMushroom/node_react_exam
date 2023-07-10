import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./Reply.scss";

const Reply = ({ id }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [answer, setAnswer] = useState("");
  const { user } = useContext(UserContext);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/questions/${id}/answers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer, userId: user._id }),
        }
      );

      if (response.ok) {
        setAnswer("");
        setError("");
        setSuccess(true);
        window.location.reload();
      } else {
        throw new Error("An error occurred while submitting the question.");
      }
    } catch (err) {
      setError("An error occurred while submitting the question.");
    }
  };

  return (
    <div className="reply">
      {success && <p>Question submitted successfully!</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="answer">Answer:</label>
        <textarea
          type="text"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Reply;

Reply.protoTypes = {
  id: PropTypes.string,
};
