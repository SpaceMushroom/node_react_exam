import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const NewQuestion = () => {
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const userId = user._id;
  //console.log(user._id, question);

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
    <div>
      {success && <p>Question submitted successfully!</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewQuestion;
