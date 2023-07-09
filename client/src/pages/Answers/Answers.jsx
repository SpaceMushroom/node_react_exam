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

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState("");

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

  const increaseCount = async (count, id) => {
    const newCount = count + 1;
    await updateCount(id, newCount);
  };

  const decreaseCount = async (count, id) => {
    const newCount = count - 1;
    await updateCount(id, newCount);
  };

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
        window.location.reload();
        console.log("Count updated successfully");
      } else {
        throw new Error("Failed to update count");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setEditedQuestion(question.question);
    setIsEditing(true);
  };

  const handleCommentEdit = (ans) => {
    setEditedAnswer(ans);
    setIsCommentEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedQuestion(e.target.value);
  };

  const handleAnswerInputChange = (e) => {
    setEditedAnswer(e.target.value);
  };

  const handleAnswerEditSubmit = async (answerID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/answers/${answerID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer: editedAnswer }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        setIsCommentEditing(false);
        window.location.reload();
      } else {
        console.error("Error editing question:", response.status);
      }
    } catch (error) {
      console.error("Error editing question:", error);
    }
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

  const handleCommentDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/answers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Question successfully deleted!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Deleting error:", error);
    }
  };

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

  //console.log(question);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!question) {
    return <p>No question found.</p>;
  }

  if (!question.answers) {
    return <p>No answers found.</p>;
  }

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

      {/* {-----------------------------------------------------------------} */}

      <div>
        <h1>Answers</h1>

        <div>
          {question.answers.map((answer) => (
            <div key={answer._id}>
              <div>
                <div>
                  <button
                    onClick={() => increaseCount(answer.count, answer._id)}
                  >
                    +
                  </button>
                  <span>{answer.count}</span>
                  <button
                    onClick={() => decreaseCount(answer.count, answer._id)}
                  >
                    -
                  </button>
                </div>
                {isCommentEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editedAnswer}
                      onChange={handleAnswerInputChange}
                    />
                    <button onClick={() => handleAnswerEditSubmit(answer._id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <h4>{answer.answer}</h4>
                )}
                <div>
                  {answer.updated ? (
                    <span>
                      Updated: {new Date(answer.created).toLocaleString()}
                    </span>
                  ) : (
                    <span>
                      Date: {new Date(answer.created).toLocaleString()}
                    </span>
                  )}
                </div>
                {user && answer.userId === user._id && !isCommentEditing && (
                  <div>
                    <button onClick={() => handleCommentEdit(answer.answer)}>
                      Edit
                    </button>
                    <button onClick={() => handleCommentDelete(answer._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* {-----------------------------------------------------------------} */}

        {user && (
          <div>
            {success && <p>Question submitted successfully!</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleCommentSubmit}>
              <div>
                <label htmlFor="answer">Answer:</label>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>
              <div></div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
