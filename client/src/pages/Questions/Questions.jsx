import { Link, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import { COMMENTS_ROUTE } from "../../routes/const";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div>
      <h1>Questions</h1>
      <div>
        {questions.map((question) => (
          <div key={question._id}>
            <Link to={generatePath(COMMENTS_ROUTE, { id: question._id })}>
              <h2>{question.question}</h2>
            </Link>
            <div>
              {question.updated ? (
                <span>Updated: {new Date(question.date).toLocaleString()}</span>
              ) : (
                <span>Date: {new Date(question.date).toLocaleString()}</span>
              )}
              <span> coments: </span>

              {question.answers.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
