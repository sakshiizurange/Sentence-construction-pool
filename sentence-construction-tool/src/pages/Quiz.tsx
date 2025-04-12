
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  sentence: string;
  correct: string[];
  options: string[];
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blanks, setBlanks] = useState<(string | null)[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; answer: string[] }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/questions').then((res) => {
      setQuestions(res.data);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleWordClick = (word: string) => {
    const index = blanks.findIndex((b) => b === null);
    if (index !== -1) {
      const newBlanks = [...blanks];
      newBlanks[index] = word;
      setBlanks(newBlanks);
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleBlankClick = (index: number) => {
    const word = blanks[index];
    if (word !== null) {
      const newBlanks = [...blanks];
      newBlanks[index] = null;
      setBlanks(newBlanks);
      setSelectedWords(selectedWords.filter((w) => w !== word));
    }
  };

  const handleNext = () => {
    const answer = blanks.map((b) => b || '');
    setUserAnswers([...userAnswers, { questionId: questions[currentIndex].id, answer }]);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(30);
    } else {
      localStorage.setItem('results', JSON.stringify([...userAnswers, { questionId: questions[currentIndex].id, answer }]));
      navigate('/results');
    }
  };

  if (questions.length === 0) return <div className="p-4">Loading...</div>;

  const question = questions[currentIndex];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="text-xl font-semibold mb-4">Time Left: {timeLeft}s</div>
      <div className="text-lg mb-6">
        {question.sentence.split('___').map((part, index) => (
          <span key={index}>
            {part}
            {index < blanks.length && (
              <button
                onClick={() => handleBlankClick(index)}
                className="border-b-2 border-dashed min-w-[60px] inline-block text-center mx-1"
              >
                {blanks[index] || '____'}
              </button>
            )}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {question.options.map((word) => (
          <button
            key={word}
            disabled={selectedWords.includes(word)}
            onClick={() => handleWordClick(word)}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={blanks.includes(null)}
        className="bg-green-500 text-white px-6 py-2 rounded disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;