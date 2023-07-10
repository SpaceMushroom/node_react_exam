import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { QUESTIONS_ROUTE } from "../../routes/const";
import Answer from "../../components/Answer/Answer";
import Button from "../../components/Button/Button";
import "./Answers.scss";

const Comments = () => {
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
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

  const handleEdit = () => {
    setEditedQuestion(question.question);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedQuestion(e.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: editedQuestion }),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        setIsEditing(false);
        window.location.reload();
      } else {
        console.error("Error editing question:", response.status);
      }
    } catch (error) {
      console.error("Error editing question:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Question successfully deleted!");
        navigate(QUESTIONS_ROUTE);
      }
    } catch (error) {
      console.error("Deleting error:", error);
    }
  };

  if (isLoading) {
    return <p className="answers">Loading...</p>;
  }

  if (!question) {
    return <p className="answers">No question found.</p>;
  }

  //console.log(question);

  return (
    <div className="answers">
      <div className="container">
        {isEditing ? (
          <div className="edit">
            <textarea
              type="text"
              value={editedQuestion}
              onChange={handleInputChange}
            />
            <Button onClick={handleEditSubmit}>Save</Button>
          </div>
        ) : (
          <div>
            <h2>{question.question}</h2>
            <div className="data">
              {question.updated ? (
                <span>Updated: {new Date(question.date).toLocaleString()}</span>
              ) : (
                <span>Date: {new Date(question.date).toLocaleString()}</span>
              )}
              <span> answers: </span>
              {question.length !== 0 ? question.answers.length : 0}
            </div>
            {user && question.userId === user._id && !isEditing && (
              <div className="btnContainer">
                <Button onClick={handleEdit}>Edit</Button>
                <Button color={"error"} onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {question.length !== 0 ? (
        <Answer id={id} question={question} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Comments;
