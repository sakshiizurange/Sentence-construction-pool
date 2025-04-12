
interface Props {
    options: string[];
    onPick: (word: string) => void;
    usedWords: string[];
  }
  
  const WordOptions = ({ options, onPick, usedWords }: Props) => (
    <div className="flex flex-wrap gap-3 mt-4">
      {options.map((word) => (
        <button
          key={word}
          onClick={() => onPick(word)}
          disabled={usedWords.includes(word)}
          className="bg-blue-200 px-4 py-2 rounded disabled:opacity-50"
        >
          {word}
        </button>
      ))}
    </div>
  );
  