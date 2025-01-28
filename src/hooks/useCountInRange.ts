import { useState } from 'react';

type Props = {
  min: number;
  max: number;
  defaultCount?: number;
};

const useCountInRange = ({ min, max, defaultCount }: Props) => {
  const [count, setCount] = useState(defaultCount ?? min);

  const increase = () => {
    setCount((prev) => Math.min(prev + 1, max));
  };

  const decrease = () => {
    setCount((prev) => Math.max(prev - 1, min));
  };

  const update = (newCount: number) => {
    if (newCount >= min && newCount <= max) {
      setCount(newCount);
    }
  };

  return {
    count,
    increase,
    decrease,
    update,
  };
};

export default useCountInRange;
