
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Quiz from './Quiz'
import ResultScreen from './ResultScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/results" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
};
export default App ;