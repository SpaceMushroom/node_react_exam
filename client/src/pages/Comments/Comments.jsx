import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { QUESTIONS_ROUTE } from "../../routes/const";

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
        console.log(data);
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
    return <p>Loading...</p>;
  }

  if (!question) {
    return <p>No question found.</p>;
  }

  if (!question.answers) {
    return <p>No answers found.</p>;
  }
  console.log(id, handleDelete);

  return (
    <div>
      <h1>Question</h1>
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedQuestion}
              onChange={handleInputChange}
            />
            <button onClick={handleEditSubmit}>Save</button>
          </div>
        ) : (
          <div>
            <h2>{question.question}</h2>
            <div>
              {question.updated ? (
                <span>Updated: {new Date(question.date).toLocaleString()}</span>
              ) : (
                <span>Date: {new Date(question.date).toLocaleString()}</span>
              )}
              <span> comments: </span>
              {question.answers.length}
            </div>
            {user && question.userId === user._id && !isEditing && (
              <div>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
