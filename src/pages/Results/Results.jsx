import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Question from '../../components/Question/Question';
import './Results.css';

const Results = () => {
  const { state } = useLocation();
  const { answers, questions } = state || { answers: [], questions: [] };
  const navigate = useNavigate();

  const correctAnswers = questions.reduce((acc, question, index) => {
    if (answers[index] === question.correct_answer) {
      acc++;
    }
    return acc;
  }, 0);

  const scoreColor = correctAnswers <= 1 ? 'red' : correctAnswers <= 3 ? 'orange' : 'green';

  const handleNewQuizClick = () => {
    navigate('/');
  };

  return (
    <div>
      {questions.map((question, index) => {
        const isCorrect = answers[index] === question.correct_answer;
        return (
          <div key={index} style={{ marginBottom: '20px' }}>
            <Question
              question={question}
              onAnswerSelection={() => {}}
              selectedAnswer={answers[index]}
              isSubmitted={true} 
              correctAnswer={question.correct_answer} 
            />
          </div>
        );
      })}
      <div>
        <h3 style={{ color: scoreColor }}>
          You got {correctAnswers} out of {questions.length} correct
        </h3>
      </div>
      <div className="button-container">
        <button className="new-quiz-button" onClick={handleNewQuizClick}>
          Create New Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;
