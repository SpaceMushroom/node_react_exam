import React, { useContext, useEffect, useState } from "react";

const Answers = ({ commentId }) => {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAnswers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/questions/${commentId}/answers`
        );
        const data = await response.json();
        setAnswers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchAnswers();
  }, [commentId]);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }
  console.log(answers);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        Array.isArray(answers) &&
        answers.map((answer) => (
          <div key={answer._id}>
            <h4>{answer.answer}</h4>
            <div>
              {answer.updated ? (
                <span>
                  Updated: {new Date(answer.created).toLocaleString()}
                </span>
              ) : (
                <span>Date: {new Date(answer.created).toLocaleString()}</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Answers;
