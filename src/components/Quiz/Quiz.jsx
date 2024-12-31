import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Question from '../Question/Question';
import PropTypes from 'prop-types';
import './Quiz.css';

const Quiz = () => {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuizWithRetry = async (retries = 5, delay = 2000) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        console.log(`Attempt ${attempt + 1} to fetch quiz data...`);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        
        if (!response.ok) {
          if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            const delayTime = retryAfter ? parseInt(retryAfter) * 1000 : delay * (attempt + 1);
            console.log(`Rate limit reached, retrying in ${delayTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delayTime));
          } else {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
        }

        const data = await response.json();

        if (data.response_code === 0) {
          return data.results;
        } else {
          throw new Error('Error fetching quiz data: ' + data.response_message);
        }
      } catch (error) {
        console.error('Error in fetching quiz data:', error.message);
        if (attempt === retries - 1) {
          throw new Error('Exceeded max retries. Please try again later.');
        }
        attempt++;
      }
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);

      try {
        const questionsData = await fetchQuizWithRetry();
        setQuestions(questionsData);
        setAnswers(new Array(questionsData.length).fill(null));
      } catch (error) {
        setError('Error fetching quiz data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [category, difficulty]);

  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
    navigate('/results', { state: { answers, questions } });
  };

  const allAnswered = answers.every(answer => answer !== null);

  if (loading) {
    return <p className="loading">Loading questions...</p>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          onAnswerSelection={(answer) => handleAnswerSelection(index, answer)}
          selectedAnswer={answers[index]} 
          isSubmitted={quizCompleted}
        />
      ))}
      {!quizCompleted && (
        <button className="submit-button" onClick={handleSubmit} disabled={!allAnswered}>
          Submit
        </button>
      )}
    </div>
  );
};

Quiz.propTypes = {
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
};

export default Quiz;
