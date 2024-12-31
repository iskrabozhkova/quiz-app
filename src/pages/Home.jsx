import React, { useState } from 'react';
import TriviaForm from '../components/TriviaForm/TriviaForm';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const navigate = useNavigate(); 

  const handleFormSubmit = (category, difficulty) => {
    setCategory(category);
    setDifficulty(difficulty);
    navigate(`/quiz/${category}/${difficulty}`);
  };

  return (
    <div>
      <h1>Quiz Maker</h1>
      <TriviaForm onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Home;
