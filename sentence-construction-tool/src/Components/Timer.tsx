
import { useEffect, useState } from "react";

interface Props {
  seconds: number;
  onEnd: () => void;
}

const Timer = ({ seconds, onEnd }: Props) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          clearInterval(interval);
          onEnd();
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-red-600 font-bold">Time: {timeLeft}s</div>;
};
