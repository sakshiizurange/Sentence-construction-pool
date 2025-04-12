
export const fetchQuestions = async (): Promise<Question[]> => {
    const res = await fetch('http://localhost:3001/questions');
    return res.json();
  };
  