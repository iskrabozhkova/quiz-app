import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Question.css'; // Import the CSS file

const Question = ({ question, onAnswerSelection, selectedAnswer, isSubmitted, correctAnswer }) => {
  const options = [...question.incorrect_answers, question.correct_answer];
  const [hoveredOption, setHoveredOption] = useState(null);

  useEffect(() => {
    if (isSubmitted) {
      setHoveredOption(null);
    }
  }, [isSubmitted]);

  const getButtonClass = (option) => {
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
          className={`button ${getButtonClass(option)}`} // Apply the dynamic class
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
