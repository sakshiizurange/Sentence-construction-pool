

import React from 'react';

interface Result {
  questionId: number;
  answer: string[];
}

interface Question {
  id: number;
  sentence: string;
  correct: string[];
  options: string[];
}

const ResultScreen = () => {
  const results: Result[] = JSON.parse(localStorage.getItem('results') || '[]');
  const [questions, setQuestions] = React.useState<Question[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const getScore = () => {
    return results.filter((res) => {
      const question = questions.find((q) => q.id === res.questionId);
      return JSON.stringify(res.answer) === JSON.stringify(question?.correct);
    }).length;
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Results</h2>
      {results.map((res, index) => {
        const question = questions.find((q) => q.id === res.questionId);
        const isCorrect = JSON.stringify(res.answer) === JSON.stringify(question?.correct);
        return (
          <div key={index} className="mb-4">
            <p className="mb-1 font-semibold">Q{index + 1}: {question?.sentence}</p>
            <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
              Your answer: {res.answer.join(' ')} {isCorrect ? '✅' : '❌'}
            </p>
            {!isCorrect && <p className="text-blue-600">Correct answer: {question?.correct.join(' ')}</p>}
          </div>
        );
      })}
      <div className="mt-6 text-xl font-bold">Score: {getScore()} / 10</div>
    </div>
  );
};

export default ResultScreen;
