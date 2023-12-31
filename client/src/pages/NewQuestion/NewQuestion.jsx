import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import "./NewQuestion.scss";

const NewQuestion = () => {
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const userId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, userId }),
      });

      if (response.ok) {
        setQuestion("");
        setError("");
        setSuccess(true);
      } else {
        throw new Error("An error occurred while submitting the question.");
      }
    } catch (err) {
      setError("An error occurred while submitting the question.");
    }
  };

  return (
    <div className="new">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label htmlFor="question">Question:</label>
          <div className="container">
            <textarea
              type="text"
              id="question"
              cols={95}
              rows={15}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
        {success && <p>Question submitted successfully!</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default NewQuestion;
