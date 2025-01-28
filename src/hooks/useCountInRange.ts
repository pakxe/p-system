import { useState } from 'react';

type Props = {
  min: number;
  max: number;
};

const useCountInRange = ({ min, max }: Props) => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((prev) => Math.min(prev + 1, max));
  };

  const decrease = () => {
    setCount((prev) => Math.max(prev - 1, min));
  };

  return {
    count,
    increase,
    decrease,
  };
};

export default useCountInRange;
