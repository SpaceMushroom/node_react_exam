import { Link, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import { COMMENTS_ROUTE } from "../../routes/const";
import "./Questions.scss";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/questions?sort=asc");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div className="questions">
      <div className="container">
        <h2>Questions</h2>
        {questions.map((question) => (
          <div className="mapContainer" key={question._id}>
            <Link to={generatePath(COMMENTS_ROUTE, { id: question._id })}>
              <h3>{question.question}</h3>
            </Link>
            <div className="info">
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
