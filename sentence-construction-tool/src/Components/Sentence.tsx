
interface Props {
    sentence: string;
    userAnswer: string[];
    onSelect: (index: number) => void;
  }
  
  const Sentence = ({ sentence, userAnswer, onSelect }: Props) => {
    const parts = sentence.split('___');
  
    return (
      <div className="text-xl flex flex-wrap gap-2">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < userAnswer.length && (
              <button
                className="px-2 py-1 border-b-2 border-gray-500 hover:bg-gray-200"
                onClick={() => onSelect(i)}
              >
                {userAnswer[i] || '____'}
              </button>
            )}
          </span>
        ))}
      </div>
    );
  };
  