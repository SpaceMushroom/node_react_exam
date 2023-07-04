import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Comments = () => {
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/questions/${id}`);
        const data = await response.json();
        setQuestion(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!question) {
    return <p>No question found.</p>;
  }

  if (!question.answers) {
    return <p>No answers found.</p>;
  }

  // if (!user) {
  //   return <p>User not found.</p>;
  // }
  //console.log(question.userId, user._id);
  return (
    <div>
      <h1>Question</h1>
      <div>
        <div key={question._id}>
          <h2>{question.question}</h2>
          <div>
            {question.updated ? (
              <span>Updated: {new Date(question.date).toLocaleString()}</span>
            ) : (
              <span>Date: {new Date(question.date).toLocaleString()}</span>
            )}
            <span> coments: </span>
            {question.answers.length}
          </div>
          {user && question.userId === user._id && <button>Edit</button>}
        </div>
      </div>
    </div>
  );
};

export default Comments;
