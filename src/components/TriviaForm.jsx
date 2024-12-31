import React, { useState, useEffect } from 'react';

const TriviaForm = ({ onFormSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  // Fetch categories from API
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
      <div>
        <label htmlFor="categorySelect">Category:</label>
        <select id="categorySelect" onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="difficultySelect">Difficulty:</label>
        <select id="difficultySelect" onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button id="createBtn" type="submit">Create Quiz</button>
    </form>
  );
};

export default TriviaForm;
