import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Question = ({ question, onAnswerSelection, selectedAnswer, isSubmitted, correctAnswer }) => {
  const options = [...question.incorrect_answers, question.correct_answer];
  const [hoveredOption, setHoveredOption] = useState(null);

  useEffect(() => {
    if (isSubmitted) {
      setHoveredOption(null); 
    }
  }, [isSubmitted]);

  const getButtonStyle = (option) => {
    if (isSubmitted) {
      if (option === correctAnswer) {
        return 'green'; 
      }
      if (option === selectedAnswer && option !== correctAnswer) {
        return 'red';
      }
      return 'transparent'; 
    }

    if (hoveredOption === option || option === selectedAnswer) {
      return 'green'; 
    }

    return 'transparent'; 
  };

  return (
    <div>
      <h3>{question.question}</h3>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswerSelection(option)} 
          onMouseEnter={() => setHoveredOption(option)} 
          onMouseLeave={() => setHoveredOption(null)} 
          style={{
            backgroundColor: getButtonStyle(option),
            border: '1px solid #ccc',
            padding: '10px 20px',
            cursor: 'pointer', 
            color: 'black',
            fontWeight: 'bold',
          }}
          disabled={isSubmitted} 
        >
          {option}
        </button>
      ))}
    </div>
  );
};

Question.propTypes = {
    question: PropTypes.shape({
      question: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
      correct_answer: PropTypes.string.isRequired,
    }).isRequired,
    onAnswerSelection: PropTypes.func.isRequired,
    selectedAnswer: PropTypes.string,
    isSubmitted: PropTypes.bool.isRequired,
    correctAnswer: PropTypes.string.isRequired,
  };

export default Question;
