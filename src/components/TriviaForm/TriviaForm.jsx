import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TriviaForm.css';

const TriviaForm = ({ onFormSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(category, difficulty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group"> 
        <div>
          <select
            id="categorySelect"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="difficultySelect"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select a difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <button id="createBtn" type="submit">
            Create Quiz
          </button>
        </div>
      </div>
    </form>
  );
};

TriviaForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default TriviaForm;
