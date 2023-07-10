import { Link, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import { COMMENTS_ROUTE } from "../../routes/const";
import Button from "../../components/Button/Button";
import "./Questions.scss";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:3000/questions?sort=${sort}${
        filter ? `&filter=${filter}` : ""
      }`
    )
      .then((resp) => resp.json())
      .then((response) => {
        setQuestions(response);
      });
  }, [sort, filter]);

  return (
    <div className="questions">
      <div className="container">
        <h2>Questions</h2>
        <div className="buttonsContainer">
          <div className="sortContainer">
            <span>Sort by date: </span>
            <Button
              variant={sort === "asc" ? "contained" : "outlined"}
              onClick={() => setSort("asc")}
            >
              Ascending
            </Button>
            <Button
              variant={sort === "asc" ? "outlined" : "contained"}
              onClick={() => setSort("dsc")}
            >
              Descending
            </Button>
          </div>
          <div className="filterContainer">
            <span>Filter: </span>
            <Button
              variant={filter === null ? "contained" : "outlined"}
              onClick={() => setFilter(null)}
            >
              All
            </Button>
            <Button
              variant={filter === "withAnswers" ? "contained" : "outlined"}
              onClick={() => setFilter("withAnswers")}
            >
              With Answers
            </Button>
            <Button
              variant={filter === "withoutAnswers" ? "contained" : "outlined"}
              onClick={() => setFilter("withoutAnswers")}
            >
              Without Answers
            </Button>
          </div>
        </div>

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
              <span> Comments: {question.answers.length}</span>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
