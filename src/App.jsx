import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Quiz from './components/Quiz/Quiz';
import Results from './pages/Results/Results';


function App() {
  return (
    <Router> 
      <Home />
      <Routes>
        <Route path="/quiz/:category/:difficulty" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App;
