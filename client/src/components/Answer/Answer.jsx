import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";
import Reply from "../Reply/Reply";
import Counter from "../Counter/Counter";
import "./Answer.scss";

const Answer = ({ id, question }) => {
  const { user } = useContext(UserContext);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState("");
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

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

  const handleAnswerInputChange = (e) => {
    setEditedAnswer(e.target.value);
  };

  const handleCommentEdit = (ans, id) => {
    setEditedAnswer(ans);
    setIsCommentEditing(true);
    setSelectedAnswerId(id);
  };

  return (
    <div className="answer">
      <p>Answers:</p>
      {question.answers.length === 0 ? (
        <p>No answers..</p>
      ) : (
        <div>
          {question.answers.map((answer, index) => (
            <div className="answerContainer" key={answer._id}>
              <div>
                {isCommentEditing ? (
                  <div
                    key={answer._id}
                    style={{
                      display:
                        answer._id === selectedAnswerId ? "block" : "none",
                    }}
                  >
                    <textarea
                      type="text"
                      value={editedAnswer}
                      onChange={handleAnswerInputChange}
                    />
                    <Button onClick={() => handleAnswerEditSubmit(answer._id)}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="ansContainer">
                    <Counter answer={answer} />
                    <h4>{answer.answer}</h4>
                  </div>
                )}
                <div className="info">
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
                  <div className="btnContainer">
                    <Button
                      onClick={() =>
                        handleCommentEdit(answer.answer, answer._id)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      color={"error"}
                      onClick={() => handleCommentDelete(answer._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {user && <Reply id={id} />}
    </div>
  );
};

export default Answer;
